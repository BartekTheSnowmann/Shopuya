"use server";

import { cookies } from "next/dist/client/components/headers";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function addProductToCart(productId: string | any): Promise<any> {
  const cart = (await getCart()) ?? (await createCart());

  if (cart) {
    const localCartId = cookies().get("localCart")?.value;
    const userCart = await prisma.cart.findFirst({
      where: {
        id: localCartId,
      },
      include: {
        items: true,
      },
    });

    const isItemInCart = userCart?.items.find(
      (item) => item.productId === productId,
    );

    if (isItemInCart?.quantity === 4) {
      throw Error("Could not add");
    }

    if (isItemInCart) {
      await prisma.cart.update({
        where: {
          id: localCartId,
        },
        data: {
          items: {
            update: {
              where: {
                id: isItemInCart.id,
                productId: productId,
              },
              data: {
                quantity: { increment: 1 },
              },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: {
          id: localCartId,
        },
        data: {
          items: {
            create: {
              productId,
              quantity: 1,
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}

export async function createCart(userId?: string) {
  //  Jesli logujesz sie i nie ma carta
  if (userId) {
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
      },
    });
    if (newCart) {
      cookies().set("localCart", newCart.id);
      return newCart;
    }
  } else {
    //  Nie ma carta po prostu
    const session = await getServerSession(authOptions);
    if (session) {
      const newCart = await prisma.cart.create({
        data: {
          userId: session?.user.id,
        },
      });
      cookies().set("localCart", newCart.id);
      return newCart;
    } else {
      const newCart = await prisma.cart.create({ data: {} });
      cookies().set("localCart", newCart.id);
      return newCart;
    }
  }
}

export async function getCart(userId?: string) {
  let userCart;

  const session = await getServerSession(authOptions);

  if (session?.user) {
    // Session
    const hasCart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (hasCart) {
      userCart = hasCart;
      return userCart;
    }
  } else {
    // No Session
    const localCartId = cookies().get("localCart")?.value;
    if (localCartId) {
      const hasCart = await prisma.cart.findFirst({
        where: {
          id: localCartId,
        },
        include: {
          items: { include: { product: true } },
        },
      });

      userCart = hasCart;
      return userCart;
    } else {
      return undefined;
    }
  }
}
export async function getCartAfterSignIn(userId: string) {
  removeCartFromCookies();
  const hasCart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
  });
  if (hasCart) {
    cookies().set("localCart", hasCart.id);
  } else {
    await createCart(userId);
  }
}

export async function removeCartFromCookies() {
  cookies().delete("localCart");
}

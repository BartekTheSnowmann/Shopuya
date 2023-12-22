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

export async function createCart() {
  const session = await getServerSession(authOptions);
  if (session) {
    // console.log(session.user);

    const newPrismaCart = await prisma.cart.create({ data: {} });
    const userCart = cookies().set("localCart", newPrismaCart.id);
    return userCart;
  }

  const newPrismaCart = await prisma.cart.create({ data: {} });
  const userCart = cookies().set("localCart", newPrismaCart.id);
  return userCart;
}

export async function getCart() {
  const localCartId = cookies().get("localCart")?.value;
  if (!localCartId) {
    return undefined;
  } else {
    const userCart = await prisma.cart.findFirst({
      where: {
        id: localCartId,
      },
      include: {
        items: { include: { product: true } },
      },
    });

    return userCart;
  }
}

export async function margeCarts(userId: string) {
  const session = await getServerSession(authOptions);

  const userCart = await prisma.cart.findFirst({
    where: {
      userId: session?.user.id,
    },
  });
  if (userCart) {
    // console.log(userCart);
  } else {
    // console.log("nie ma, trzeba utowrzyc");
  }

  cookies().set("localCart", userCart?.id!);
}

export async function removeCartFromCookies() {
  const userCart = cookies().set("localCart", "");
}

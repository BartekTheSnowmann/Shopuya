"use server";

import { getCart } from "../product/[id]/actions";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { cookies } from "next/dist/client/components/headers";

export default async function changeQuantity(productId: any, quantity: number) {
  const cart = await getCart();

  const articleInCart = cart?.items.find(
    (item) => item.productId === productId,
  );

  if (quantity === 0) {
    await prisma.cart.update({
      where: {
        id: cart?.id,
      },
      data: {
        items: {
          delete: {
            id: articleInCart?.id,
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        id: cart?.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: articleInCart?.id,
            },
            data: {
              quantity,
            },
          },
        },
      },
    });
  }

  revalidatePath("/cart");
}

export async function checkout() {
  const localCartId = cookies().get("localCart")?.value;
  const userCart = await prisma.cart.findFirst({
    where: {
      id: localCartId,
    },
    include: {
      items: true,
    },
  });

  await prisma.cart.update({
    where: {
      id: localCartId,
    },
    data: {
      items: {
        deleteMany: {},
      },
    },
  });

  revalidatePath("/cart");
}

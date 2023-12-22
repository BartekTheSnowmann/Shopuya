import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import BuyBtn from "./BuyBtn";
import FormatPrice from "@/lib/db/utils/formatPrice";
import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";

async function Product({ id }: { id: string }) {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col items-center bg-light p-8 pb-8 shadow-sm shadow-primary sm:flex-row">
      <figure className="max-w-sm shadow-md">
        <Image
          className="object-cover"
          src={product.imageUrl}
          alt={product.name}
          height={400}
          width={400}
        />
      </figure>
      <Flex
        className="py-4 sm:p-4 sm:py-0 md:bg-transparent"
        direction="column"
        gap="2"
      >
        <Heading size={"8"} className="drop-shadow-md">
          {product.name}
        </Heading>
        <Text className="font-medium text-muted first-letter:uppercase">
          {product.description}
        </Text>
        <Flex>
          <BuyBtn product={product}>Buy</BuyBtn>
          <FormatPrice price={product.price} />
        </Flex>
      </Flex>
    </div>
  );
}

export default Product;

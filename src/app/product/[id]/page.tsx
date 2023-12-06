import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import FormatPrice from "@/lib/db/utils/formatPrice";
import { Flex, Heading } from "@radix-ui/themes";
import BuyBtn from "./BuyBtn";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function page({ params: { id } }: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="flex flex-col justify-center gap-4 px-4 py-16  md:flex-row md:items-center md:justify-normal">
      <div className="mx-auto flex w-fit flex-col md:mx-0 md:flex-row md:items-center">
        <figure className="border-b-2 md:border-b-0 md:border-r-2">
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt={product.name}
            height={400}
            width={400}
          />
        </figure>
        <Flex
          className="h-full bg-zinc-50 p-4 md:bg-transparent"
          direction="column"
          gap="2"
        >
          <Heading size={"8"} className="drop-shadow-md">
            {product.name}
          </Heading>
          <p className="text-xl">{product.description}</p>
          <Flex align="center">
            <BuyBtn product={product}>Buy</BuyBtn>
            <FormatPrice price={product.price} />
          </Flex>
        </Flex>
      </div>
    </section>
  );
}

export default page;

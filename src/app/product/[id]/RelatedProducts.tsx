import React from "react";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import "@/app/embla.css";
import prisma from "@/lib/db/prisma";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

async function RelatedProducts({ id }: { id: string }) {
  const displayedProduct = await prisma.product.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      id: true,
    },
  });

  if (!displayedProduct) {
    notFound();
  }

  const relatedProductsList = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: displayedProduct?.name.split(" ")[0],
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: displayedProduct.description,
            mode: "insensitive",
          },
        },
      ],
      NOT: [
        {
          id: displayedProduct.id,
        },
      ],
    },
  });

  if (!relatedProductsList.length) {
    return;
  }

  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  };
  const SLIDE_COUNT = relatedProductsList.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <section className="py-16">
      <Heading className="text-medium text-muted">Related Products</Heading>
      <div className="divider mt-2" />
      <section className="sandbox__carousel">
        <EmblaCarousel
          products={relatedProductsList}
          slides={SLIDES}
          options={OPTIONS}
        />
      </section>
    </section>
  );
}

export default RelatedProducts;

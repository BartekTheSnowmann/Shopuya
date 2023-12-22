import React, { Suspense } from "react";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import RelatedProducts from "./RelatedProducts";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function page({ params: { id } }: ProductPageProps) {
  try {
    await prisma.product.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    return notFound();
  }

  return (
    <section className="px-4 py-16">
      <Suspense fallback={<ProductSkeleton />}>
        <Product id={id} />
      </Suspense>

      <RelatedProducts id={id} />
    </section>
  );
}

export default page;

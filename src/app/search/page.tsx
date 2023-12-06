import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "../components/ProductCard";
import { Frown } from "lucide-react";
import { Suspense } from "react";
import BarLoading from "@/app/loading";

interface SearchPageProps {
  searchParams: {
    query: string;
  };
}

async function page({ searchParams: { query } }: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  if (!products.length) {
    return (
      <section className="px-4 py-16">
        <h1 className="flex items-center gap-x-4 text-3xl font-bold">
          No products
          <Frown className="h-8 w-8" />
        </h1>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 text-zinc-800">
      <h1 className="mb-4 text-3xl font-bold">
        {products.length} Results for {query}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <Suspense fallback={<BarLoading />}>
            <ProductCard key={product.id} product={product} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

export default page;

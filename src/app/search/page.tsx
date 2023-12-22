import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "../components/ProductCard";
import { Frown } from "lucide-react";
import { Suspense } from "react";
import BarLoading from "@/app/loading";
import SearchedProducts from "./SearchedProducts";
import ProductSkeleton from "../product/[id]/ProductSkeleton";

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
    <section className="px-4 py-16">
      <Suspense fallback={<ProductSkeleton />}>
        <SearchedProducts products={products} query={query} />
      </Suspense>
    </section>
  );
}

export default page;

import { Product } from "@prisma/client";
import React, { Suspense } from "react";
import ProductCard from "../components/ProductCard";

async function SearchedProducts({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">
        {products.length} Results for {query}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default SearchedProducts;

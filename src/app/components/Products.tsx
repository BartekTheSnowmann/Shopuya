import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";

async function Products({ slicedProducts }: { slicedProducts: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {slicedProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;

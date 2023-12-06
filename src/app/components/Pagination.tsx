"use client";
import { Product } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface paginationProps {
  products: Product[];
  perPage: number;
  currentPage: number;
}

function Pagination({ products, perPage, currentPage }: paginationProps) {
  let numbers = Math.floor(products.length / perPage);

  let arr = [];
  for (let i = 1; i <= numbers; i++) {
    arr.push(i);
  }

  const router = useRouter();

  return (
    <div className="flex justify-center gap-2 py-12">
      <Button
        onClick={() => router.push(`/?query=${currentPage - 1}`)}
        disabled={currentPage == 1}
      >
        <ChevronLeft />
      </Button>

      <Button onClick={() => router.push(`/?query=${currentPage}`)}>
        {currentPage}
      </Button>
      <Button
        onClick={() => router.push(`/?query=${currentPage + 1}`)}
        disabled={currentPage > numbers}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default Pagination;

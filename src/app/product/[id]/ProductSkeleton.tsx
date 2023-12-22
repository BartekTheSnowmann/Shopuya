import { Flex } from "@radix-ui/themes";
import React from "react";

function ProductSkeleton() {
  return (
    <section className="flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-normal">
      <div className="mx-auto flex w-fit flex-col md:mx-0 md:flex-row md:items-center">
        <div className="bg-skeleton h-[320px] w-[320px] animate-pulse"></div>
        <Flex className="py-4 md:h-full md:px-4" direction="column" gap="2">
          <div className="bg-skeleton h-8 w-80 animate-pulse"></div>
          <div className="bg-skeleton h-8 w-80 animate-pulse"></div>
        </Flex>
      </div>
    </section>
  );
}

export default ProductSkeleton;

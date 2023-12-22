import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import FormatPrice from "@/lib/db/utils/formatPrice";
import Link from "next/link";
import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt!).getTime() <
    1000 * 60 * 60 * 24 * 3;

  return (
    <div className="group flex flex-col justify-between bg-light text-dark shadow-sm shadow-primary">
      <figure className="group relative aspect-square h-80 cursor-pointer overflow-hidden">
        <Image
          className="h-full object-cover duration-300 group-hover:scale-105"
          src={product.imageUrl}
          alt={product.name}
          height={900}
          width={1200}
        />
        {isNew && (
          <Badge variant="solid" className="absolute left-2 top-2 w-fit">
            NEW
          </Badge>
        )}
      </figure>

      <Flex
        align="start"
        direction="column"
        justify={"between"}
        gap="2"
        className="h-48 p-4 font-bold"
      >
        <div className="w-full">
          <div className="">
            {/* border-b-2 border-secondary */}
            <Heading className="mb-2 drop-shadow-sm" size="6">
              {product.name}
            </Heading>
          </div>
          <Flex
            className="mt-2 w-full flex-col items-start justify-between md:flex-row"
            gap="2"
          >
            <Text className="font-medium text-muted first-letter:uppercase">
              {product.description?.length > 80
                ? product.description.slice(0, 80) + "..."
                : product.description}
            </Text>
          </Flex>
        </div>
        <Flex>
          <Link href={`/product/${product.id}`}>
            <Button
              className="hover:text-light"
              radius="none"
              variant="surface"
            >
              More Details
            </Button>
          </Link>
          <FormatPrice price={product.price} />
        </Flex>
      </Flex>
    </div>
  );
}

export default ProductCard;

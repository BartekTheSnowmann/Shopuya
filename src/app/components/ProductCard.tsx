import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import FormatPrice from "@/lib/db/utils/formatPrice";
import Link from "next/link";
import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { StarFilledIcon } from "@radix-ui/react-icons";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt!).getTime() <
    1000 * 60 * 60 * 24 * 3;

  return (
    <div className="flex flex-col justify-between text-dark shadow-lg">
      <figure className="relative aspect-square h-80">
        <Image
          className="h-full object-cover"
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
        <Heading className="drop-shadow-md" size="6">
          {product.name}
        </Heading>
        <Flex>
          {[...Array(5).keys()].map((i) => (
            <React.Fragment key={i}>
              <StarFilledIcon color="orange" />
            </React.Fragment>
          ))}
        </Flex>

        <Flex
          className="w-full flex-col items-start justify-between md:flex-row"
          gap="2"
        >
          <Text className="font-normal text-zinc-800 first-letter:uppercase">
            {product.description?.length > 80
              ? product.description.slice(0, 80) + "..."
              : product.description}
          </Text>
        </Flex>
        <Flex>
          <Link href={`/product/${product.id}`}>
            <Button radius="none" variant="surface">
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

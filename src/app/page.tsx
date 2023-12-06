import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import FormatPrice from "@/lib/db/utils/formatPrice";
import { Badge, Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Pagination from "./components/Pagination";

interface HomePageInterface {
  searchParams: {
    query: number;
  };
}

export default async function Home({
  searchParams: { query },
}: HomePageInterface) {
  const products = await prisma.product.findMany();
  const bannerImg = products[0];

  let perPage = 8;
  let currentPage: number = Number(query) || 1;
  let slicedProducts = products.slice(
    (currentPage - 1) * perPage,
    perPage * currentPage,
  );

  return (
    <section className="px-4 pb-16 text-zinc-800">
      {/* Big Image / Banner */}

      <div className="max-w-7xl border-b-2 px-4 py-16">
        <div className="mx-auto flex w-fit flex-wrap gap-4 text-zinc-800 shadow-md">
          <div className="relative flex flex-col md:flex-row">
            <Image
              className="shadow-lg"
              src={bannerImg.imageUrl}
              alt={bannerImg.name}
              height={400}
              width={400}
            />
            <div className="flex flex-col justify-center gap-2 p-4">
              <Badge variant="solid" className="absolute left-2 top-2 ">
                Featured
              </Badge>
              <Heading size={"8"} className="drop-shadow-md">
                {bannerImg.name}
              </Heading>
              <Flex>
                <Link href={`/product/${bannerImg.id}`}>
                  <Button radius="none" variant="surface">
                    More Details
                  </Button>
                </Link>
                <FormatPrice price={bannerImg.price} />
              </Flex>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <Heading className="text-gray-600" size="4">
          Found {slicedProducts?.length} Items! ⚔
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {slicedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          products={products}
        />
      </div>

      {/* Smaller ones */}
    </section>
  );
}

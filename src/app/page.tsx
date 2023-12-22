import prisma from "@/lib/db/prisma";
import Image from "next/image";
import FormatPrice from "@/lib/db/utils/formatPrice";
import { Badge, Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Pagination from "./components/Pagination";
import EmptyCart from "./components/EmptyCart";
import Products from "./components/Products";

interface HomePageInterface {
  searchParams: {
    query: number;
  };
}

export default async function Home({
  searchParams: { query },
}: HomePageInterface) {
  let perPage = 12;
  let currentPage: number = Number(query) || 1;
  const products = await prisma.product.findMany();
  const slicedProducts = products.slice(
    (currentPage - 1) * perPage,
    perPage * currentPage,
  );

  if (slicedProducts.length < 1) {
    return <EmptyCart />;
  }

  const bannerImg = products[7];

  return (
    <section className="px-4 pb-16">
      {/* Big Image / Banner */}

      {currentPage === 1 && (
        <>
          <div className="max-w-7xl px-4 pt-16">
            <div className="mx-auto flex w-fit flex-wrap gap-4 bg-radix_primary p-4 shadow-md shadow-primary">
              <div className="relative flex flex-col md:flex-row">
                <Image
                  src={bannerImg.imageUrl}
                  alt={bannerImg.name}
                  height={400}
                  width={400}
                />
                <div className="flex flex-col justify-center gap-2 p-4">
                  <Badge variant="solid" className="absolute left-2 top-2">
                    Featured
                  </Badge>
                  <Heading size={"8"} className="text-white drop-shadow-md">
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
          <div className="border-img mt-16"></div>
        </>
      )}

      <div>
        <Products slicedProducts={slicedProducts} />
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          products={products}
        />
      </div>
    </section>
  );
}

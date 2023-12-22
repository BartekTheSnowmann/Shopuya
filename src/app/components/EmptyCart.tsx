import { Button, Heading, Text } from "@radix-ui/themes";
import React from "react";
import EmptyCartImg from "@/../public/svg/empty_cart_1.svg";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

function EmptyCart() {
  return (
    <div className="grid place-items-center px-4 py-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-x-2 drop-shadow-lg">
        <Heading size="6">Your Cart is Empty!</Heading>
        <Text className="text-muted">Time to add something!</Text>
      </div>
      <Image
        className="mt-8"
        src={EmptyCartImg}
        alt="Empty Cart Image"
        height={400}
        width={300}
      />
      <Button asChild className="mt-4 bg-black">
        <Link href={"/"}>
          <ShoppingBag />
          Back to Store
        </Link>
      </Button>
    </div>
  );
}

export default EmptyCart;

import { Button, Heading, Text } from "@radix-ui/themes";
import { Frown } from "lucide-react";
import React from "react";
import ShoppingBags from "@/../public/svg/empty_cart.png";
import Image from "next/image";

function EmptyCart() {
  return (
    <div className="grid place-items-center px-4 py-24">
      <div className="mx-auto flex gap-x-2">
        <Heading size="8">Your Cart is Empty!</Heading>
        <Frown className="h-8 w-8" />
      </div>
      <Image
        className="mt-8"
        src={ShoppingBags}
        alt="Empty Cart Image"
        height={500}
        width={340}
      />
    </div>
  );
}

export default EmptyCart;

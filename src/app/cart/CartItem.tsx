"use client";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useTransition } from "react";
import FormatPrice from "@/lib/db/utils/formatPrice";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Link from "next/link";

type CartItemProps = {
  cartItem: {
    quantity: number;
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      cartId: string | null;
    };
  };
  changeQuantity: (productId: any, quantity: number) => Promise<void>;
};

function CartItemComponent({ cartItem, changeQuantity }: CartItemProps) {
  const itemQuantity = cartItem.quantity;
  const itemCost = itemQuantity * cartItem.product.price;

  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 4; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div className="border-md flex flex-col gap-4 bg-light p-4 shadow-sm shadow-primary sm:flex-row">
      <figure>
        <Image
          className="h-60 w-60 object-cover shadow-md"
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          height={200}
          width={200}
        />
      </figure>
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-col justify-between">
          <div>
            <Link href={`/product/${cartItem.product.id}`}>
              <div>
                <Heading size={"6"} className="drop-shadow-md">
                  {cartItem.product.name}
                </Heading>
                <div className="divider mb-4 mt-1" />
              </div>
            </Link>
            {/* <Text className="my-4 block font-medium text-muted first-letter:uppercase">
              {cartItem.product.description}
            </Text> */}
          </div>
          {isPending ? (
            <div>
              <Loader className="animate-spin text-primary" />
            </div>
          ) : (
            <FormatPrice className="w-16" price={itemCost} />
          )}
        </div>

        <div className="flex flex-col">
          <select
            className="flex max-w-[80px] flex-col gap-2"
            defaultValue={cartItem.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);
              startTransition(async () => {
                await changeQuantity(cartItem.product.id, newQuantity);
                toast.success("Quantity has changed!");
              });
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CartItemComponent;

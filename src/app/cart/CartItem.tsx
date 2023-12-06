"use client";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useTransition } from "react";
import FormatPrice from "@/lib/db/utils/formatPrice";
import BarLoader from "@/app/loading";
import { toast } from "sonner";

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
    <div className="border-md flex gap-x-4 bg-blue-200 p-4">
      <Image
        className="h-60 w-60 object-cover"
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        height={200}
        width={200}
      />
      <div className="flex flex-col justify-between">
        <Heading>{cartItem.product.name}</Heading>
        <Text>{cartItem.product.description}</Text>

        <div className="flex flex-col">
          <div>
            Quantity:
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
        <div className="mt-2">
          {isPending ? (
            "Changing Quantity..."
          ) : (
            <FormatPrice className="w-16" price={itemCost} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItemComponent;

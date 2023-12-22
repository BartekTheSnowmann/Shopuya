import React from "react";
import { getCart } from "../product/[id]/actions";
import CartItem from "./CartItem";
import changeQuantity from "./actions";
import FormatPrice from "@/lib/db/utils/formatPrice";
import CheckoutBtn from "./CheckoutBtn";
import EmptyCart from "../components/EmptyCart";
import { Heading } from "@radix-ui/themes";
import { ShoppingBag } from "lucide-react";

async function page() {
  const cartItems = await getCart();

  if (!cartItems?.items.length) {
    return <EmptyCart />;
  }

  let price = cartItems.items
    .map((item) => item.quantity * item.product.price)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  return (
    <section className="flex flex-col gap-4 px-4 py-16">
      <div className="flex gap-2 pb-8 text-muted sm:items-center">
        <ShoppingBag className="hidden fill-primary sm:block" />
        <Heading size={"6"} className="text-medium">
          You have {cartItems.items.length}
          {cartItems.items.length > 1 ? " items" : " item"} in your cart
        </Heading>
      </div>
      <div className="flex flex-col gap-4">
        {cartItems?.items?.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            changeQuantity={changeQuantity}
          />
        ))}
      </div>

      <div className="flex pt-8">
        <CheckoutBtn />
        <FormatPrice price={price} />
      </div>
    </section>
  );
}

export default page;

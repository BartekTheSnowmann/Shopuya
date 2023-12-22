"use client";

import { Product } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import React, { useTransition } from "react";
import { addProductToCart } from "./actions";
import BarLoader from "@/app/loading";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface BuyBtnProps {
  product: Product;
  children: React.ReactNode;
}

function BuyBtn({ product, children }: BuyBtnProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          try {
            await addProductToCart(product.id);
            toast.success("Added the product!");
          } catch (err) {
            toast.error(
              "Could not add the product! Youve already reached the maximum amount",
            );
          }
        })
      }
      radius="none"
      disabled={isPending}
    >
      {isPending ? <Loader className="animate-spin text-primary" /> : children}
    </Button>
  );
}

export default BuyBtn;

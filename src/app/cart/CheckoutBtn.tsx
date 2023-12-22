"use client";

import { Button } from "@radix-ui/themes";
import React, { useTransition } from "react";
import { checkout } from "./actions";
import { Loader } from "lucide-react";

function CheckoutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      radius="none"
      variant="solid"
      className="w-fit"
      onClick={() =>
        startTransition(async () => {
          checkout();
        })
      }
    >
      {isPending ? (
        <Loader className="animate-spin text-primary" />
      ) : (
        "Checkout"
      )}
    </Button>
  );
}

export default CheckoutBtn;

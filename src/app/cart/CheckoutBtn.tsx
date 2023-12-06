"use client";

import { Button } from "@radix-ui/themes";
import React, { startTransition, useTransition } from "react";
import { checkout } from "./actions";

function CheckoutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          checkout();
        })
      }
    >
      Checkout
    </Button>
  );
}

export default CheckoutBtn;

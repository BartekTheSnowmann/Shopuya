import { Badge } from "@radix-ui/themes";
import React from "react";

interface FormatPriceProps {
  price: number;
  className?: string;
}

function formatPrice({ price, className }: FormatPriceProps) {
  return (
    <Badge
      radius="none"
      size="2"
      variant="outline"
      className={`flex w-16 justify-center ${className}`}
    >
      {price}$
    </Badge>
  );
}

export default formatPrice;

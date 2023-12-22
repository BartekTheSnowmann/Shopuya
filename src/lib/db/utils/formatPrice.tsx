"use client";

import { Badge } from "@radix-ui/themes";
import React from "react";
import { motion } from "framer-motion";

interface FormatPriceProps {
  price: number;
  className?: string;
}

function formatPrice({ price, className }: FormatPriceProps) {
  return (
    <Badge
      radius="none"
      size="2"
      variant="surface"
      className={`flex w-16 justify-center p-1 uppercase tracking-wider ${className}`}
    >
      <motion.p
        key={price}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {price}$
      </motion.p>
    </Badge>
  );
}

export default formatPrice;

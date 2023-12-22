"use client";

import { Button } from "@radix-ui/themes";
import { Loader } from "lucide-react";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

function FormBtn({ children, className, ...props }: FormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button className={`${className}`} disabled={pending}>
      {pending ? <Loader className="animate-spin text-white" /> : children}
    </Button>
  );
}

export default FormBtn;

"use client";

import { Button } from "@radix-ui/themes";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

function FormBtn({ children, className, ...props }: FormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button>
      <button
        {...props}
        className={`${className}`}
        type="submit"
        disabled={pending}
      >
        {pending ? "Adding..." : children}
      </button>
    </Button>
  );
}

export default FormBtn;

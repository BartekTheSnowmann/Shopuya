"use client";

import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import React from "react";

interface LogOutBtnProps {
  className?: string;
  children: React.ReactNode;
}

function LogOutBtn({ className, children }: LogOutBtnProps) {
  return (
    <Button
      className={`${className} cursor-pointer`}
      variant="solid"
      onClick={() => signOut()}
    >
      {children}
    </Button>
  );
}

export default LogOutBtn;

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import LogOutBtn from "./LogOutBtn";

interface BurgerMenuProps {
  session: Session | null;
}

function BurgerMenu({ session }: BurgerMenuProps) {
  const user = session?.user;

  return (
    <>
      <div className="block md:hidden">
        <Flex gap="2" className="flex items-center md:hidden">
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <HamburgerMenuIcon height="18" width="18" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/add-product">
                <DropdownMenuItem>Add Product</DropdownMenuItem>
              </Link>
              <Link href="/cart">
                <DropdownMenuItem>Cart</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <div className="pb-2 pl-2">
                    <UserAvatar session={session} />
                  </div>
                  <LogOutBtn>Log Out</LogOutBtn>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  <Link href="sign-up">
                    <Button className="w-full" variant="solid">
                      Sign up
                    </Button>
                  </Link>
                  <Link href="api/auth/signin">
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </ul>
              )}
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </Flex>
      </div>
    </>
  );
}

export default BurgerMenu;

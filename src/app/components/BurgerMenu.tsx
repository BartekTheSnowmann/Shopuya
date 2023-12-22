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
import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import LogOutBtn from "./LogOutBtn";
import { ShoppingCart } from "lucide-react";

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
            <DropdownMenuContent className="mt-2 font-medium">
              {/* <Link href="/add-product">
                <DropdownMenuItem>Add Product</DropdownMenuItem>
              </Link> */}
              <Link href={"/cart"} className="ml-4">
                Cart
              </Link>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <div className="pb-2 pl-2">
                    <UserAvatar session={session} />
                  </div>
                  <LogOutBtn>Sign out</LogOutBtn>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  <Link href="/sign-up">
                    <Button className="w-full" variant="solid">
                      Sign up
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button
                      className="w-full hover:text-light"
                      variant="outline"
                    >
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

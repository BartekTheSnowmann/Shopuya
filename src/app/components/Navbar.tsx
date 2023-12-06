import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import UserAvatar from "./UserAvatar";
import {
  Button,
  IconButton,
  TextField,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import BurgerMenu from "./BurgerMenu";
import Shopuya from "../../../public/shopuya.png";
import Image from "next/image";

async function Navbar() {
  const searchForItem = async (formData: FormData) => {
    "use server";

    const query = formData.get("query")?.toString();

    redirect(`/search?query=${query}`);
  };

  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center bg-white shadow-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/">
          <Image src={Shopuya} alt="Shopuya" height={60} width={60} />
        </Link>

        <form action={searchForItem}>
          <TextFieldRoot>
            <TextFieldInput placeholder="Katana..." name="query" />
            <TextFieldSlot>
              <IconButton variant="ghost">
                <MagnifyingGlassIcon height="18" width="18" />
              </IconButton>
            </TextFieldSlot>
          </TextFieldRoot>
        </form>

        <BurgerMenu session={session} />

        <div className="hidden md:flex">
          <ul className="mr-8 flex items-center gap-x-4">
            <Link href="/cart">Cart</Link>
            <Link href="/add-product">Add Product</Link>
          </ul>
          {session?.user && (
            <div className="ml-8">
              <UserAvatar session={session} />
            </div>
          )}

          {!session?.user && (
            <ul className="flex gap-x-2 border-l-2 px-4">
              <Link href="sign-up">
                <Button variant="solid">Sign up</Button>
              </Link>
              <Link href="api/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

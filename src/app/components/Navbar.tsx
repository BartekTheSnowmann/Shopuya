import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import UserAvatar from "./UserAvatar";
import {
  Button,
  IconButton,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import BurgerMenu from "./BurgerMenu";
import Shopuya from "../../../public/shopuya_exclusive/shopuyanobg2.png";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

async function Navbar() {
  const searchForItem = async (formData: FormData) => {
    "use server";
    const query = formData.get("query")?.toString();
    if (!query?.length) {
      return;
    }
    redirect(`/search?query=${query}`);
  };

  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center bg-light shadow-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/">
          <Image src={Shopuya} priority alt="Shopuya" height={60} width={60} />
        </Link>

        <form action={searchForItem}>
          <TextFieldRoot>
            <TextFieldInput placeholder="Nike Vintage..." name="query" />
            <TextFieldSlot>
              <IconButton variant="ghost">
                <MagnifyingGlassIcon height="18" width="18" />
              </IconButton>
            </TextFieldSlot>
          </TextFieldRoot>
        </form>

        <BurgerMenu session={session} />

        <div className="hidden md:flex">
          {session?.user && (
            <div className="ml-8">
              <UserAvatar session={session} />
            </div>
          )}

          <ul className="flex items-center gap-x-2 px-4">
            {!session?.user && (
              <>
                <Link href="/sign-up">
                  <Button variant="solid">Sign up</Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="hover:text-light" variant="surface">
                    Sign In
                  </Button>
                </Link>
              </>
            )}

            <Link href={"/cart"} className="ml-4">
              <ShoppingCart />
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

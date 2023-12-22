"use client";

import {
  Button,
  Heading,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import ShopuyaBg from "@/../public/shopuya_exclusive/shopuyaBg.png";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.warning("Fill the inputs");
    }
    await signIn("credentials", {
      callbackUrl: "/cart",
      username,
      password,
    });
  };

  return (
    <section className="py-16 sm:px-4">
      <div className="mx-auto flex w-fit flex-wrap rounded-md bg-light px-4 py-10 shadow-md sm:px-12 sm:py-16 md:w-full md:flex-nowrap md:px-0 md:py-0">
        <div className="hidden w-1/2 rounded-md bg-[#6E56CF] md:block">
          <Image
            className="w-full rounded-md shadow-md"
            src={ShopuyaBg}
            aria-hidden
            alt="Mango Wallpaper"
            role="presentation"
          />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div>
            <div className="pb-8">
              <Heading size="8">Sign In</Heading>
              <div>
                <span className="flex items-center gap-x-1 text-sm text-muted">
                  No Account?
                  <Button asChild className="font-semibold" variant="ghost">
                    <Link href={"/sign-up"}>Sign up</Link>
                  </Button>
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4"
            >
              <TextFieldSlot>
                <TextFieldInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-80"
                  type="text"
                  name="username"
                  placeholder="username"
                />
              </TextFieldSlot>

              <TextFieldSlot>
                <TextFieldInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  className="w-80"
                  name="password"
                  placeholder="password"
                />
              </TextFieldSlot>

              <Button>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;

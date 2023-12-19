"use client";

import {
  Button,
  Heading,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import Mango from "@/../public/mango.jpg";
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
    <section className="px-4 py-16 text-zinc-800">
      <div className="flex flex-wrap bg-light py-12 md:flex-nowrap md:py-0">
        <div className="hidden w-1/2 md:block">
          <Image src={Mango} aria-hidden alt="Mango Wallpaper" />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div>
            <div className="pb-8">
              <Heading className="" size="8">
                Sign In
              </Heading>
              <div>
                <span className="text-muted flex items-center gap-x-1 text-sm">
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

import prisma from "@/lib/db/prisma";
import React from "react";
import { redirect } from "next/navigation";
import {
  Button,
  Heading,
  TextArea,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import Mango from "@/../public/mango.jpg";
import Image from "next/image";

async function page() {
  async function createUser(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const username = formData.get("username")?.toString() || "siema";
    const email = formData.get("email")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !username || !email || !password) throw Error();

    const isUserInDb = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (isUserInDb) {
      console.log("user already in db");
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        image: imageUrl,
        password,
      },
    });

    redirect("/");
  }

  return (
    <section className="px-4 py-16 text-zinc-800">
      <div className="flex flex-wrap md:flex-nowrap md:bg-blue-400">
        <div className="hidden w-1/2 md:block">
          <Image src={Mango} aria-hidden alt="Mango Wallpaper" />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div>
            <div className="pb-8">
              <Heading className="" size="8">
                Create Account
              </Heading>
            </div>
            <form className="flex w-full flex-col gap-4" action={createUser}>
              <TextFieldSlot>
                <TextFieldInput
                  type="text"
                  className="w-80"
                  name="name"
                  placeholder="name"
                />
              </TextFieldSlot>

              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="text"
                  name="username"
                  placeholder="username"
                />
              </TextFieldSlot>

              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="email"
                  name="email"
                  placeholder="email"
                />
              </TextFieldSlot>

              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="url"
                  name="imageUrl"
                  placeholder="imageUrl"
                />
              </TextFieldSlot>

              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="password"
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

export default page;

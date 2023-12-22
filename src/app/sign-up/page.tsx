import prisma from "@/lib/db/prisma";
import React from "react";
import { redirect } from "next/navigation";
import {
  Button,
  Heading,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import ShopuyaBg from "@/../public/shopuya_exclusive/shopuyaBg.png";
import Image from "next/image";
import Link from "next/link";

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
      return;
    }

    await prisma.user.create({
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
              <Heading className="" size="8">
                Create Account
              </Heading>
              <span className="flex items-center gap-x-1 text-sm text-muted">
                Already Have an Account?
                <Button asChild className="font-semibold" variant="ghost">
                  <Link href={"/sign-in"}>Sign in</Link>
                </Button>
              </span>
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

import prisma from "@/lib/db/prisma";
import React from "react";
import { redirect } from "next/navigation";

async function page() {
  async function createUser(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const username = formData.get("username")?.toString() || "siema";
    const email = formData.get("email")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !username || !email || !password) throw Error();

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        image: imageUrl,
        password,
      },
    });

    console.log(newUser);
    redirect("/");
  }

  return (
    <section className="p-4">
      <form className="flex flex-col items-start gap-4" action={createUser}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="url" name="imageUrl" placeholder="imageUrl" />
        <input type="password" name="password" placeholder="password" />
        <button className="bg-primary px-4 py-2">Submit</button>
      </form>
    </section>
  );
}

export default page;

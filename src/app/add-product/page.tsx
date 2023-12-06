import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import FormBtn from "../components/FormBtn";
import {
  Heading,
  TextArea,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";

export const metadata = {
  title: "Add Product - Website Name",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString().trim();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price"));

  if (!name || !description || !price || !imageUrl) {
    return console.log("pass the data bro");
  } else {
    await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
      },
    });
    redirect("/");
  }
}

function page() {
  return (
    <section className="px-4 py-16 text-zinc-800">
      <Heading className="pb-8" size="8">
        Add product
      </Heading>
      <form className="flex flex-col items-start gap-4" action={addProduct}>
        <TextFieldSlot>
          <TextFieldInput type="text" name="name" placeholder="name..." />
        </TextFieldSlot>

        <TextArea name="description" placeholder="Reply to comment…" />

        <TextFieldSlot>
          <TextFieldInput type="url" name="imageUrl" placeholder="imageUrl…" />
        </TextFieldSlot>
        <TextFieldSlot>
          <TextFieldInput type="number" name="price" placeholder="price" />
        </TextFieldSlot>

        <FormBtn>Submit</FormBtn>
      </form>
    </section>
  );
}

export default page;

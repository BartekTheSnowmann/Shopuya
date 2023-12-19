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
import Mango from "@/../public/mango.jpg";
import Image from "next/image";

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
      <div className="flex flex-wrap bg-light py-8 md:flex-nowrap md:py-0">
        <div className="hidden w-1/2 md:block">
          <Image src={Mango} aria-hidden alt="Mango Wallpaper" />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div>
            <div className="pb-8">
              <Heading className="" size="8">
                Add product
              </Heading>
              <p className="text-gray-600">Add Some Product to our shop!</p>
            </div>
            <form
              className="flex flex-col items-stretch gap-4"
              action={addProduct}
            >
              <TextFieldSlot className="w-full">
                <TextFieldInput
                  className="w-80"
                  type="text"
                  name="name"
                  placeholder="name..."
                />
              </TextFieldSlot>
              <TextFieldSlot>
                <TextArea
                  className="w-80"
                  name="description"
                  placeholder="Reply to comment…"
                />
              </TextFieldSlot>
              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="url"
                  name="imageUrl"
                  placeholder="imageUrl…"
                />
              </TextFieldSlot>
              <TextFieldSlot>
                <TextFieldInput
                  className="w-80"
                  type="number"
                  name="price"
                  placeholder="price"
                />
              </TextFieldSlot>
              <FormBtn className="w-full">Submit</FormBtn>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;

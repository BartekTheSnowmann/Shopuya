import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import {
  Heading,
  TextArea,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";

import ShopuyaBg4 from "@/../public/shopuya_exclusive/shopuyaBg2_4.png";
import Image from "next/image";
import FormBtn from "../components/FormBtn";

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
    <section className="py-16 sm:px-4">
      <div className="mx-auto flex w-fit flex-wrap rounded-md bg-light px-4 py-10 shadow-md sm:px-12 sm:py-16 md:w-full md:flex-nowrap md:px-0 md:py-0">
        <div className="hidden w-1/2 rounded-md bg-radix_primary md:block">
          <Image
            className="w-full rounded-md rounded-tr-none shadow-md"
            src={ShopuyaBg4}
            aria-hidden
            alt="Mango Wallpaper"
            role="presentation"
          />
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
                  placeholder="description…"
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

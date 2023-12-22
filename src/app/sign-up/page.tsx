import React from "react";
import { Button, Heading } from "@radix-ui/themes";
import ShopuyaBg from "@/../public/shopuya_exclusive/shopuyaBg.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

async function page() {
  return (
    <section className="py-16 sm:px-4">
      <div className="mx-auto flex w-fit flex-wrap rounded-md bg-light px-4 py-10 shadow-md sm:px-12 sm:py-16 md:w-full md:flex-nowrap md:px-0 md:py-0">
        <div className="hidden w-1/2 rounded-md bg-[#6E56CF] md:block">
          <Image
            className="h-full w-full rounded-md shadow-md"
            src={ShopuyaBg}
            aria-hidden
            alt="Mango Wallpaper"
            role="presentation"
          />
        </div>
        <div className="flex w-full items-center justify-center py-4 md:w-1/2">
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

            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;

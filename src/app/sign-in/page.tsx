import Image from "next/image";

import ShopuyaBg from "@/../public/shopuya_exclusive/shopuyaBg.png";
import SignInForm from "./SignInForm";

function Page() {
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
        <SignInForm />
      </div>
    </section>
  );
}

export default Page;

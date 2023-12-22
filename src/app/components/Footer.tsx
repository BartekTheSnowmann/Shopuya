import Image from "next/image";
import Link from "next/link";
import React from "react";
import Shopuya from "../../../public/shopuya_exclusive/shopuyanobg2.png";
import {
  CopyrightIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import { Heading } from "@radix-ui/themes";

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-primary">
      <div className="mx-4 flex flex-col border-t-2 border-primary px-4 py-12">
        <Link className="mx-auto" href="/">
          <Image src={Shopuya} alt="Shopuya" height={60} width={60} />
        </Link>

        <ul className="mx-auto mb-10 mt-6 flex items-center gap-x-8 text-muted">
          <li>
            <FacebookIcon width="24" height="24" />
          </li>
          <li>
            <TwitterIcon width="24" height="24" />
          </li>
          <li>
            <InstagramIcon width="24" height="24" />
          </li>
        </ul>

        <div className="flex justify-around">
          <div>
            <Heading className="pb-2" size={"4"}>
              Support
            </Heading>
            <ul>
              <li>Blog</li>
              <li>Help</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <Heading className="pb-2" size={"4"}>
              About Us
            </Heading>
            <ul>
              <li>Our team</li>
              <li>Career</li>
              <li>More</li>
            </ul>
          </div>
          <div>
            <Heading className="pb-2" size={"4"}>
              Product
            </Heading>
            <ul>
              <li>How it works</li>
              <li>Benefits</li>
              <li>Features</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid h-16 place-items-center">
        <p className="flex items-center gap-x-2 font-normal text-muted">
          <CopyrightIcon width="24" height="24" />
          Shopuya 2024
        </p>
      </div>
    </footer>
  );
}

export default Footer;

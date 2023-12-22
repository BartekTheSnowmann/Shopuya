"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import NotFoundUfo from "@/../public/svg/not_found_ufo.svg";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <div className="grid place-items-center px-4 py-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-x-2 drop-shadow-lg">
        <Heading size="6">Page Not Found!</Heading>
        <Text className="text-muted">You might have misspelled something!</Text>
      </div>
      <Image
        className="mt-8"
        src={NotFoundUfo}
        alt="Empty Cart Image"
        height={400}
        width={300}
      />
      <Flex>
        <Button onClick={() => router.back()} className="group mt-8 bg-black">
          <Undo2 className="group-hover:text-primary" />
          Go Back
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="group mt-8 bg-black"
        >
          <Undo2 className="group-hover:text-primary" />
          Go Back
        </Button>
      </Flex>
    </div>
  );
}

export default NotFound;

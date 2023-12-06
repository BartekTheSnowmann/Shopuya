import React from "react";
import { Session } from "next-auth";
import Image from "next/image";
import LogOutBtn from "./LogOutBtn";
import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Flex,
} from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";

interface UserAvatarProps {
  session?: Session;
}

function UserAvatar({ session }: UserAvatarProps) {
  const user = session?.user;

  return (
    <Flex gap="2" className="items-center">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <div>
            <Avatar
              src={user?.image as string}
              fallback={user?.name?.slice(0, 1) as string}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuSeparator /> */}
          <LogOutBtn>Sign Out</LogOutBtn>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </Flex>
  );
}

export default UserAvatar;

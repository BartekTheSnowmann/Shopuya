import React from "react";
import { Session } from "next-auth";
import LogOutBtn from "./LogOutBtn";
import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
} from "@radix-ui/themes";

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
              className="shadow-md"
              radius="large"
              src={user?.image as string}
              fallback={user?.name?.slice(0, 1) as string}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="hidden md:block">
          <span className="mx-1 block font-medium">{session?.user.name}</span>

          <DropdownMenuSeparator />
          <LogOutBtn>Sign Out</LogOutBtn>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </Flex>
  );
}

export default UserAvatar;

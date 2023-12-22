"use server";

import prisma from "@/lib/db/prisma";

export interface newUserData {
  name: string;
  username: string;
  email: string;
  imageUrl?: string;
  password: string;
}

export async function createUser(formData: newUserData) {
  const isUsernameOccupied = await prisma.user.findUnique({
    where: {
      username: formData.username,
    },
  });

  const isEmailOccupied = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (isUsernameOccupied) {
    return { success: false, message: "Username is already used" };
  }
  if (isEmailOccupied) {
    return { success: false, message: "Email is already used" };
  }

  const newUser = await prisma.user.create({
    data: {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      image:
        formData.imageUrl ||
        "https://i.pinimg.com/280x280_RS/d8/ea/7b/d8ea7b37641ce7b201f264041d300ea1.jpg",
      password: formData.password,
    },
  });

  return {
    success: true,
    message: `${newUser.username} Successfully created!`,
    newUser,
  };
}

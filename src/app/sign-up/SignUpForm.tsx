"use client";

import { Badge, TextFieldInput, TextFieldSlot } from "@radix-ui/themes";
import React, { useState } from "react";
import { createUser, newUserData } from "./actions";
import { newUserSchema } from "@/lib/db/validators/userValidation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import FormBtn from "../components/FormBtn";

type TstateError = {
  isError: boolean | null;
  message: string[];
};

function SignUpForm() {
  const [isError, setIsError] = useState<TstateError>({
    isError: false,
    message: [""],
  });

  const clientAction = async (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const imageUrl = formData.get("imageUrl")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!name || !username || !email || !password) {
      return;
    }

    const newUser: newUserData = {
      name,
      username,
      email,
      imageUrl:
        imageUrl ||
        "https://i.pinimg.com/280x280_RS/d8/ea/7b/d8ea7b37641ce7b201f264041d300ea1.jpg",
      password,
    };

    const result = newUserSchema.safeParse(newUser);
    if (!result.success) {
      let isArr: string[] = [];
      result.error.issues.map((error) => {
        isArr.push(error.message);
        setIsError({ isError: true, message: isArr });
      });
      toast.error(
        isArr.map((err) => (
          <React.Fragment key={`signUpErr - ${err.length}`}>
            {err}
            <br />
          </React.Fragment>
        )),
      );
      return;
    }

    try {
      const response = await createUser(newUser);
      if (!response.success) {
        toast.warning(response.message);
      } else {
        toast.success(response.message);
        await signIn("credentials", {
          callbackUrl: "/",
          username: response.newUser?.username,
          password: response.newUser?.password,
        });
      }
    } catch (error) {}
  };

  return (
    <form className="flex w-full flex-col gap-4" action={clientAction}>
      {isError.isError && (
        <Badge className="block text-center" color="red">
          <motion.span
            key={isError.message?.length}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            There is an error!
          </motion.span>
        </Badge>
      )}

      <TextFieldSlot>
        <TextFieldInput
          type="text"
          className="w-80"
          name="name"
          placeholder="name"
          required
        />
      </TextFieldSlot>

      <TextFieldSlot>
        <TextFieldInput
          className="w-80"
          type="text"
          name="username"
          placeholder="username"
          required
        />
      </TextFieldSlot>

      <TextFieldSlot>
        <TextFieldInput
          className="w-80"
          type="email"
          name="email"
          placeholder="email"
          required
        />
      </TextFieldSlot>

      <TextFieldSlot>
        <TextFieldInput
          className="w-80"
          type="url"
          name="imageUrl"
          placeholder="imageUrl"
        />
      </TextFieldSlot>

      <TextFieldSlot>
        <TextFieldInput
          className="w-80"
          type="password"
          name="password"
          placeholder="password"
          required
        />
      </TextFieldSlot>

      <FormBtn>Submit</FormBtn>
    </form>
  );
}

export default SignUpForm;

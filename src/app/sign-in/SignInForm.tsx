"use client";

import {
  Badge,
  Button,
  Heading,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import { motion } from "framer-motion";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import React, { useState } from "react";
import { userSchema } from "@/lib/db/validators/userValidation";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type TstateError = {
  isError: boolean | null;
  message: string[];
};

function SignInForm() {
  const router = useRouter();

  const [isError, setIsError] = useState<TstateError>({
    isError: false,
    message: [""],
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsPending(true);
    e.preventDefault();

    const newUser = {
      username,
      password,
    };

    const result = userSchema.safeParse(newUser);
    if (!result.success) {
      let isArr: string[] = [];
      result.error.issues.map((error) => {
        isArr.push(error.message);
        setIsError({ isError: true, message: isArr });
      });
      setIsPending(false);
      toast.error(
        isArr.map((err) => (
          <React.Fragment key={`signIpErr - ${err}`}>
            {err}
            <br />
          </React.Fragment>
        )),
      );
      return;
    }

    try {
      const login = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        username,
        password,
      });
      if (login?.status == 200) {
        setIsPending(false);
        toast.success(`Welcome back ${username}!`);
        router.refresh();
        router.push("/");
      } else {
        setIsPending(false);
        toast.error("User not Found 🙃. You might have misspelled something");
      }
    } catch (error) {}
  };

  return (
    <div className="flex w-full items-center justify-center md:w-1/2">
      <div>
        <div className="pb-8">
          <Heading size="8">Sign In</Heading>
          <div>
            <span className="flex items-center gap-x-1 text-sm text-muted">
              No Account?
              <Button asChild className="font-semibold" variant="ghost">
                <Link href={"/sign-up"}>Sign up</Link>
              </Button>
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-80"
              type="text"
              name="username"
              placeholder="username"
            />
          </TextFieldSlot>

          <TextFieldSlot>
            <TextFieldInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="w-80"
              name="password"
              placeholder="password"
            />
          </TextFieldSlot>

          <Button disabled={isPending}>
            {isPending ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;

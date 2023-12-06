import { margeCarts, removeCartFromCookies } from "@/app/product/[id]/actions";
import prisma from "@/lib/db/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        return user;
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      console.log(user.id);
      await margeCarts(user.id);
    },
    async signOut() {
      await removeCartFromCookies();
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import {
  getCartAfterSignIn,
  removeCartFromCookies,
} from "@/app/product/[id]/actions";
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

        if (!user) {
          return null;
        }

        const isPwdMatching = user.password === credentials?.password;
        if (!isPwdMatching) {
          return null;
        }

        return user;
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      await getCartAfterSignIn(user.id);
    },
    async signOut() {
      await removeCartFromCookies();
    },
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

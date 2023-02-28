import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "../../../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const bcrypt = require("bcryptjs");

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await client.user.findUnique({
          where: {
            Email: email,
          },
          select: {
            id: true,
            Email: true,
            Name: true,
            Role: true,
            Password: true,
          },
        });
        console.log(user);
        if (!user) {
          return NextResponse.json({
            message: "User does not exist",
          });
        }
        const isValid = await bcrypt.compare(password, user.Password);
        if (!isValid) {
          return NextResponse.json({
            message: "Invalid password",
          });
        }
        return {
          id: user.id,
          Email: user.Email,
          Name: user.Name,
          Role: user.Role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = { ...session.user, ...token, ...user };
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

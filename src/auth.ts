import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./app/[locale]/(auth)/apis/auth.api";
import { loginSchema } from "./features/auth/schemes/auth.schema";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error("Invalid username or password");
        }
        const data = await login(result.data);

        if (!data.status || !data.payload) {
          throw new Error(data.message || "Login failed");
        }

        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      if (trigger === "update" && session) {
        const { email, firstName, lastName, profilePhoto, phone } = session;
        token.user = {
          ...token.user,
          ...(email && { email }),
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(profilePhoto !== undefined && { profilePhoto }),
          ...(phone && { phone }),
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {JWT} from "@auth/core/jwt";

type CustomSession = {
  accessToken?: string;
  username?: string;
  email?: string;
} & Session;

export const { handlers: { GET, POST }, auth} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email repo", // Request email and other necessary scopes
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token; // Dynamically add accessToken
        token.username = profile.email || profile.name || "";
        token.email = profile.email || "";
      }
      return token; // Always return the token
    },


    async session({ session, token }: { session: CustomSession, token: JWT }) {
      // Attach the accessToken and username to the session object
      session.accessToken = token.accessToken as string | undefined;
      session.username = token.username as string | undefined;
      session.email = token.email as string | undefined;

      return session; // Return the modified session object
    },
  },
});

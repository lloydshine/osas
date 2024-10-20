// @types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Optional string for role
    office?: string; // Optional string for office
  }

  interface Session {
    user: User; // Ensure session user is of your extended User type
    accessToken?: string; // Include accessToken in the session
  }

  interface JWT {
    user: User; // Extend JWT to include the user type
    accessToken?: string; // Include accessToken in JWT type
  }
}

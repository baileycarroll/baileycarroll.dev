import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use relative URLs to avoid baseURL issues
});

// Export specific methods for easier use
export const { signIn, signUp, useSession, signOut } = authClient;

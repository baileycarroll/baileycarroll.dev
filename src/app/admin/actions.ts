"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { adminHasPasskey, retirePasswordCredentials } from "@/lib/auth-admin";

export async function completePasskeySetup() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated.");
  }

  const hasPasskey = await adminHasPasskey(session.user.id);
  if (!hasPasskey) {
    throw new Error("Register a passkey before completing setup.");
  }

  await retirePasswordCredentials(session.user.id);
}

export async function signOutAdmin() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/admin/login");
}

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "@/lib/auth";
import { adminHasPasskey } from "@/lib/auth-admin";

type RequireAdminSessionOptions = {
  requirePasskey?: boolean;
};

export async function getAdminSession(): Promise<Session | null> {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAdminSession(
  options: RequireAdminSessionOptions = {}
): Promise<Session> {
  const { requirePasskey = true } = options;
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (requirePasskey) {
    const hasPasskey = await adminHasPasskey(session.user.id);
    if (!hasPasskey) {
      redirect("/admin/setup-passkey");
    }
  }

  return session;
}

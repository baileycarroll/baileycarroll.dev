import { redirect } from "next/navigation";
import SetupPasskeyForm from "@/components/admin/SetupPasskeyForm";
import { adminHasPasskey } from "@/lib/auth-admin";
import { getAdminSession } from "@/lib/auth-session";

export default async function AdminSetupPasskeyPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (await adminHasPasskey(session.user.id)) {
    redirect("/admin/dashboard");
  }

  return <SetupPasskeyForm />;
}

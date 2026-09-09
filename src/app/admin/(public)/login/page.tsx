import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminEmail } from "@/config/auth";
import { adminHasPasskey, getAdminUser } from "@/lib/auth-admin";
import { getAdminSession } from "@/lib/auth-session";

export default async function AdminLoginPage() {
  const adminEmail = getAdminEmail();
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured.");
  }

  const session = await getAdminSession();
  const adminUser = await getAdminUser();
  const passkeyEnabled = adminUser ? await adminHasPasskey(adminUser.id) : false;

  if (session) {
    if (passkeyEnabled) {
      redirect("/admin/dashboard");
    }
    redirect("/admin/setup-passkey");
  }

  return <AdminLoginForm passkeyEnabled={passkeyEnabled} adminEmail={adminEmail} />;
}

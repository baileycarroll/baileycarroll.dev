import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/auth-session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">
      {children}
    </div>
  );
}

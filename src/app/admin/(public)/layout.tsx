import type { ReactNode } from "react";

export default function AdminPublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16">
      {children}
    </div>
  );
}

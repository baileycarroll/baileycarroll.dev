"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { authClient } from "@/lib/auth-client";

type AdminLoginFormProps = {
  passkeyEnabled: boolean;
  adminEmail: string;
};

export default function AdminLoginForm({
  passkeyEnabled,
  adminEmail,
}: AdminLoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePasswordLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await authClient.signIn.email({
      email: adminEmail,
      password,
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message ?? "Unable to sign in.");
      return;
    }

    router.push("/admin/setup-passkey");
    router.refresh();
  }

  async function handlePasskeyLogin() {
    setError(null);
    setIsSubmitting(true);

    const result = await authClient.signIn.passkey();

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message ?? "Passkey sign-in failed.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <Card variant="elevated" className="w-full rounded-[28px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading Level={4}>Admin sign in</Heading>
          <Paragraph size="sm" className="text-neutral-400">
            {passkeyEnabled
              ? "Use your passkey to access the admin portal."
              : "Use your bootstrap password to sign in, then register a passkey."}
          </Paragraph>
        </div>

        {passkeyEnabled ? (
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={handlePasskeyLogin}
            disabled={isSubmitting}
          >
            Sign in with passkey
          </Button>
        ) : (
          <form className="space-y-4" onSubmit={handlePasswordLogin}>
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm text-neutral-400">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={adminEmail}
                readOnly
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm text-neutral-400">
                Bootstrap password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-200 outline-none focus:border-primary/30"
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}

        {error && (
          <Paragraph size="sm" className="text-red-300">
            {error}
          </Paragraph>
        )}
      </div>
    </Card>
  );
}

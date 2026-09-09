"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { authClient } from "@/lib/auth-client";
import { completePasskeySetup } from "@/app/admin/actions";

export default function SetupPasskeyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegisterPasskey() {
    setError(null);
    setIsSubmitting(true);

    const result = await authClient.passkey.addPasskey({
      name: "Admin passkey",
    });

    if (result.error) {
      setError(result.error.message ?? "Unable to register passkey.");
      setIsSubmitting(false);
      return;
    }

    try {
      await completePasskeySetup();
    } catch (setupError) {
      setError(
        setupError instanceof Error
          ? setupError.message
          : "Passkey registered, but setup could not be completed."
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <Card variant="elevated" className="w-full rounded-[28px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading Level={4}>Register your passkey</Heading>
          <Paragraph size="sm" className="text-neutral-400">
            This replaces the bootstrap password. After this step, only your passkey
            can sign in to admin.
          </Paragraph>
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full"
          onClick={handleRegisterPasskey}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Waiting for device..." : "Create passkey"}
        </Button>

        {error && (
          <Paragraph size="sm" className="text-red-300">
            {error}
          </Paragraph>
        )}
      </div>
    </Card>
  );
}

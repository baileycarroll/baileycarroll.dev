import Link from "next/link";
import { signOutAdmin } from "@/app/admin/actions";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import { requireAdminSession } from "@/lib/auth-session";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Heading Level={2}>Admin dashboard</Heading>
        <Paragraph className="text-neutral-400">
          Signed in as {session.user.email}. Passkey authentication is active.
        </Paragraph>
      </div>

      <Card variant="default" className="rounded-[24px]">
        <div className="space-y-4">
          <Heading Level={5}>Next steps</Heading>
          <Paragraph size="sm" className="text-neutral-300">
            CMS screens for projects, experience, and skills will land here in the
            next phase. Auth is wired and ready.
          </Paragraph>
          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <Button variant="outline">View public site</Button>
            </Link>
            <form action={signOutAdmin}>
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

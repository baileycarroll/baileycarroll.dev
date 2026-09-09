import { prisma } from "@/lib/database";
import { getAdminEmail } from "@/config/auth";

const CREDENTIAL_PROVIDER_ID = "credential";

export async function getAdminUser() {
  const email = getAdminEmail();
  if (!email) {
    return null;
  }

  return prisma.user.findUnique({
    where: { email },
  });
}

export async function adminHasPasskey(userId: string): Promise<boolean> {
  const count = await prisma.passkey.count({
    where: { userId },
  });
  return count > 0;
}

export async function retirePasswordCredentials(userId: string): Promise<void> {
  await prisma.account.deleteMany({
    where: {
      userId,
      providerId: CREDENTIAL_PROVIDER_ID,
    },
  });
}

export function isAdminEmail(email: string): boolean {
  const adminEmail = getAdminEmail();
  return adminEmail.length > 0 && email.toLowerCase().trim() === adminEmail;
}

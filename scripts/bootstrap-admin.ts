import { auth } from "../src/lib/auth";
import {
  getAdminEmail,
  getBootstrapPassword,
  isAuthBootstrapEnabled,
} from "../src/config/auth";
import { getAdminUser } from "../src/lib/auth-admin";
import { prisma } from "../src/lib/database";

async function main() {
  const email = getAdminEmail();
  const password = getBootstrapPassword();
  const name = process.argv[2] || "Bailey Carroll";

  if (!email || !password) {
    console.error("Usage: pnpm auth:bootstrap [name]");
    console.error("Requires ADMIN_EMAIL and ADMIN_BOOTSTRAP_PASSWORD in the environment.");
    process.exit(1);
  }

  if (!isAuthBootstrapEnabled()) {
    console.error("AUTH_USER_INIT must be set to 'true' to bootstrap the admin user.");
    process.exit(1);
  }

  try {
    const existingUser = await getAdminUser();
    if (existingUser) {
      console.error("Admin user already exists. Bootstrap skipped.");
      process.exit(1);
    }

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result.user) {
      console.error("Failed to create admin user.");
      process.exit(1);
    }

    console.log("Admin user created successfully.");
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log("\nNext steps:");
    console.log("1. Sign in at /admin/login with your bootstrap password");
    console.log("2. Register your passkey at /admin/setup-passkey");
    console.log("3. Remove ADMIN_BOOTSTRAP_PASSWORD and AUTH_USER_INIT from your environment");
  } catch (error) {
    console.error("Failed to bootstrap admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

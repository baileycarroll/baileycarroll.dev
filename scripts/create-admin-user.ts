import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/database";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin User";

  if (!email || !password) {
    console.error("Usage: pnpm tsx scripts/create-admin-user.ts <email> <password> [name]");
    console.error("Make sure AUTH_USER_INIT=true is set in your environment");
    process.exit(1);
  }

  if (process.env.AUTH_USER_INIT !== "true") {
    console.error("❌ AUTH_USER_INIT must be set to 'true' to create initial user");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error("❌ User already exists");
      process.exit(1);
    }

    // Create user using Better Auth's API
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (result.user) {
      console.log("✅ Admin user created successfully!");
      console.log(`Email: ${email}`);
      console.log(`Name: ${name}`);
      console.log("\nYou can now sign in to the admin portal at /auth/signin");
    } else {
      console.error("❌ Failed to create user");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Failed to create admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

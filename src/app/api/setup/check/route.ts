import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function GET() {
  try {
    // Check if AUTH_USER_INIT is enabled
    const authUserInit = process.env.AUTH_USER_INIT === "true";
    
    if (!authUserInit) {
      return NextResponse.json({ allowed: false, reason: "AUTH_USER_INIT not enabled" });
    }

    // Check if any users exist
    const userCount = await prisma.user.count();
    
    if (userCount > 0) {
      return NextResponse.json({ allowed: false, reason: "Users already exist" });
    }

    return NextResponse.json({ allowed: true });
  } catch (error) {
    console.error("Setup check error:", error);
    return NextResponse.json(
      { allowed: false, reason: "Database error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

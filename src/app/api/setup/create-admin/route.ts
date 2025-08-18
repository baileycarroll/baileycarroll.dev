import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    // Check if AUTH_USER_INIT is enabled
    const authUserInit = process.env.AUTH_USER_INIT === "true";
    
    if (!authUserInit) {
      return NextResponse.json(
        { error: "AUTH_USER_INIT not enabled" },
        { status: 403 }
      );
    }

    // Check if any users exist
    const userCount = await prisma.user.count();
    
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Users already exist" },
        { status: 403 }
      );
    }

    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Create user using Better Auth's server API
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    // Check if the result has a user (success) or error
    if (result.user && result.token) {
      return NextResponse.json({ 
        success: true, 
        message: "Admin account created successfully" 
      });
    } else {
      return NextResponse.json(
        { error: result.error?.message || result.error || "Failed to create admin account" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the admin account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

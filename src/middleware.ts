import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Use Better Auth's session checking via API route
      const sessionCheckResponse = await fetch(`${request.nextUrl.origin}/api/auth/check-session`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      });

      if (!sessionCheckResponse.ok) {
        // Redirect to sign-in page if no valid session
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      // If session check fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - login (login page)
     * - setup (setup page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|login|setup|_next/static|_next/image|favicon.ico).*)",
  ],
};

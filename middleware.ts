import { auth } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isSignupPage = req.nextUrl.pathname === "/admin/signup";

  // Allow access to login and signup page without authentication
  if (isLoginPage || isSignupPage) {
    // If already logged in, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};


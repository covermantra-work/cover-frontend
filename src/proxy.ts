import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Protect /auth-gate-70898 and all sub-routes (/leads, /lenders, etc.)
  if (pathname.startsWith("/auth-gate-70898")) {
    const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_ACCESS_KEY || "Cover@Mantra01";
    const accessKey = searchParams.get("secret") || searchParams.get("key");
    const sessionCookie = request.cookies.get("cm_admin_session")?.value;

    // 1. One-time Secret Key login via URL (?secret=... or ?key=...)
    if (accessKey && accessKey === ADMIN_SECRET) {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete("secret");
      cleanUrl.searchParams.delete("key"); // Strip key from URL for safety

      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set("cm_admin_session", ADMIN_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth-gate-70898",
        maxAge: 60 * 60 * 8, // 8 Hours session validity
      });
      return response;
    }

    // 2. Check if valid admin session cookie exists
    if (sessionCookie && sessionCookie === ADMIN_SECRET) {
      return NextResponse.next();
    }

    // 3. STEALTH 404 REWRITE:
    // Unauthorized user/bot ko HTTP 404 serve karo bina URL change kiye.
    // Unhe lagega yeh route exist hi nahi karta!
    return NextResponse.rewrite(new URL("/404", request.url), {
      status: 404,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth-gate-70898/:path*"],
};

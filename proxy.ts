// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Skip middleware for verify-email route
//   if (pathname.startsWith("/verify-email")) {
//     return NextResponse.next();
//   }

//   // Check for session token in cookies
//   const sessionToken = request.cookies.get("better-auth.session_token");

//   //* User is not authenticated at all
//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Allow access if session exists
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin-dashboard/:path*", "/provider-dashboard/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/provider-dashboard/:path*",
  ],
};
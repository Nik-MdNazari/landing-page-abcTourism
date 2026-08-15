import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE } from "@/app/login/session";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE;
  if (isAuthenticated) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

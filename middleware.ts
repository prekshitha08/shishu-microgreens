import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminSessionCookie, isValidAdminSession } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionValue = request.cookies.get(adminSessionCookie)?.value;
    if (!isValidAdminSession(sessionValue)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    const sessionValue = request.cookies.get(adminSessionCookie)?.value;
    if (!isValidAdminSession(sessionValue)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  adminSessionCookie,
  createAdminSessionValue,
  validateAdminCredentials
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "");
  const password = String(body.password || "");

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookie, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return NextResponse.json({ ok: true });
}

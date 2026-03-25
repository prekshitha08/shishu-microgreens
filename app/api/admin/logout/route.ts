import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminSessionCookie } from "@/lib/admin-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
  return NextResponse.json({ ok: true });
}

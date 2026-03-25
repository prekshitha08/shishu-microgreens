import crypto from "crypto";

const COOKIE_NAME = "shishu_admin_session";

function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "admin@shishumicrogreens.com";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "shishu-admin-secret";
}

export function validateAdminCredentials(email: string, password: string) {
  return email === getAdminEmail() && password === getAdminPassword();
}

export function createAdminSessionValue() {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(timestamp)
    .digest("hex");

  return `${timestamp}.${signature}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) {
    return false;
  }

  const [timestamp, signature] = value.split(".");
  if (!timestamp || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", getSessionSecret())
    .update(timestamp)
    .digest("hex");

  return expected === signature;
}

export const adminSessionCookie = COOKIE_NAME;

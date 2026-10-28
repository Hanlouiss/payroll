import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSessionToken, verifySessionToken } from "./jwt";
import type { SessionData } from "./types";

export async function createSession(data: SessionData) {
  const token = await signSessionToken(data);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession(): Promise<SessionData | null> {
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
}

export function destroySession() {
  cookies().delete(SESSION_COOKIE);
}

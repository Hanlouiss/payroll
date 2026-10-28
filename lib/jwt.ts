// Edge-safe (used by middleware). No next/headers imports here.
import { SignJWT, jwtVerify } from "jose";
import type { Role, SessionData } from "./types";

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set (see .env.example)");
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(data: SessionData): Promise<string> {
  return new SignJWT({ idPegawai: data.idPegawai, role: data.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token?: string): Promise<SessionData | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const role = payload.role;
    if (typeof payload.idPegawai !== "string" || (role !== "1" && role !== "2")) return null;
    return { idPegawai: payload.idPegawai, role: role as Role };
  } catch {
    return null;
  }
}

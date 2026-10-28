import bcrypt from "bcryptjs";

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

/** Supports bcrypt hashes and the old plain-text passwords already in the database. */
export async function verifyPassword(plain: string, stored: string) {
  if (stored.startsWith("$2")) return bcrypt.compare(plain, stored);
  return plain === stored;
}

export const isHashed = (stored: string) => stored.startsWith("$2");

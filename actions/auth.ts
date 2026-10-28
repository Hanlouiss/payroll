"use server";

import { redirect } from "next/navigation";
import { execute, query } from "@/lib/db";
import { hashPassword, isHashed, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";
import { formField } from "@/lib/format";
import type { LoginState, Role, User } from "@/lib/types";

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = formField(formData, "username");
  const password = (formData.get("password") as string | null) ?? "";

  const candidates = await query<User>(
    "SELECT id, id_pegawai, hak_akses, password FROM user WHERE username = ?",
    [username]
  );

  let matched: User | null = null;
  for (const u of candidates) {
    if (u.password && (await verifyPassword(password, u.password))) {
      matched = u;
      break;
    }
  }

  const role = matched?.hak_akses?.trim();
  if (!matched || !matched.id_pegawai || (role !== "1" && role !== "2")) {
    return { error: "Username atau password salah." };
  }

  // Old plain-text password? Upgrade it to a bcrypt hash on first successful login.
  if (matched.password && !isHashed(matched.password)) {
    await execute("UPDATE user SET password = ? WHERE id = ?", [await hashPassword(password), matched.id]);
  }

  await createSession({ idPegawai: matched.id_pegawai, role: role as Role });
  redirect(role === "1" ? "/" : "/karyawan");
}

export async function logoutAction() {
  destroySession();
  redirect("/login");
}

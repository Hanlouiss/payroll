"use server";

import { redirect } from "next/navigation";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formField } from "@/lib/format";
import { hashPassword } from "@/lib/password";

const withError = (path: string, message: string) => `${path}?error=${encodeURIComponent(message)}`;
const validRole = (v: string) => v === "1" || v === "2";

export async function createUserAction(formData: FormData) {
  await requireAdmin();
  const id = formField(formData, "id");
  const idPegawai = formField(formData, "id_pegawai");
  const username = formField(formData, "username");
  const password = (formData.get("password") as string | null) ?? "";
  const hakAkses = formField(formData, "hak_akses");

  if (!id || !idPegawai || !username || !password || !validRole(hakAkses)) {
    redirect(withError("/data-user/create", "Semua kolom wajib diisi."));
  }

  let failed = false;
  try {
    await execute(
      "INSERT INTO user (id, id_pegawai, username, password, hak_akses) VALUES (?, ?, ?, ?, ?)",
      [id, idPegawai, username, await hashPassword(password), hakAkses]
    );
  } catch {
    failed = true;
  }
  if (failed) redirect(withError("/data-user/create", "Data gagal ditambahkan! (ID mungkin sudah dipakai)"));
  redirect("/data-user");
}

export async function updateUserAction(formData: FormData) {
  await requireAdmin();
  const id = formField(formData, "id");
  const idPegawai = formField(formData, "id_pegawai");
  const username = formField(formData, "username");
  const password = (formData.get("password") as string | null) ?? "";
  const hakAkses = formField(formData, "hak_akses");
  const editPath = `/data-user/${encodeURIComponent(id)}/edit`;

  if (!id || !idPegawai || !username || !validRole(hakAkses)) {
    redirect(withError(editPath, "Kolom wajib diisi."));
  }

  let failed = false;
  try {
    if (password) {
      await execute(
        "UPDATE user SET id_pegawai = ?, username = ?, password = ?, hak_akses = ? WHERE id = ?",
        [idPegawai, username, await hashPassword(password), hakAkses, id]
      );
    } else {
      // blank password = keep the current one
      await execute("UPDATE user SET id_pegawai = ?, username = ?, hak_akses = ? WHERE id = ?", [
        idPegawai,
        username,
        hakAkses,
        id,
      ]);
    }
  } catch {
    failed = true;
  }
  if (failed) redirect(withError(editPath, "Data gagal diubah!"));
  redirect("/data-user");
}

export async function deleteUserAction(formData: FormData) {
  await requireAdmin();
  const id = formField(formData, "id");

  let failed = false;
  try {
    await execute("DELETE FROM user WHERE id = ?", [id]);
  } catch {
    failed = true;
  }
  if (failed) redirect(withError("/data-user", "Data gagal dihapus!"));
  redirect("/data-user");
}

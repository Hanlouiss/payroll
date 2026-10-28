"use server";

import { redirect } from "next/navigation";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formField } from "@/lib/format";

function readPegawai(formData: FormData) {
  return {
    id: formField(formData, "id"),
    nama: formField(formData, "nama"),
    alamat: formField(formData, "alamat"),
    tgl_lahir: formField(formData, "tgl_lahir"),
    divisi: formField(formData, "divisi"),
    gaji_pokok: formField(formData, "gaji_pokok"),
    kerja_1_bulan: formField(formData, "kerja_1_bulan"),
    jam_Kerja: formField(formData, "jam_Kerja"),
  };
}

const withError = (path: string, message: string) => `${path}?error=${encodeURIComponent(message)}`;

export async function createPegawaiAction(formData: FormData) {
  await requireAdmin();
  const p = readPegawai(formData);
  if (Object.values(p).some((v) => !v)) redirect(withError("/data-pegawai/create", "Semua kolom wajib diisi."));

  let failed = false;
  try {
    await execute(
      "INSERT INTO pegawai (id, nama, alamat, tgl_lahir, divisi, gaji_pokok, kerja_1_bulan, jam_Kerja) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [p.id, p.nama, p.alamat, p.tgl_lahir, p.divisi, p.gaji_pokok, p.kerja_1_bulan, p.jam_Kerja]
    );
  } catch {
    failed = true; // e.g. duplicate id
  }
  if (failed) redirect(withError("/data-pegawai/create", "Data gagal ditambahkan! (ID mungkin sudah dipakai)"));
  redirect("/data-pegawai");
}

export async function updatePegawaiAction(formData: FormData) {
  await requireAdmin();
  const p = readPegawai(formData);
  const editPath = `/data-pegawai/${encodeURIComponent(p.id)}/edit`;
  if (Object.values(p).some((v) => !v)) redirect(withError(editPath, "Semua kolom wajib diisi."));

  let failed = false;
  try {
    await execute(
      "UPDATE pegawai SET nama = ?, alamat = ?, tgl_lahir = ?, divisi = ?, gaji_pokok = ?, kerja_1_bulan = ?, jam_Kerja = ? WHERE id = ?",
      [p.nama, p.alamat, p.tgl_lahir, p.divisi, p.gaji_pokok, p.kerja_1_bulan, p.jam_Kerja, p.id]
    );
  } catch {
    failed = true;
  }
  if (failed) redirect(withError(editPath, "Data gagal diperbarui!"));
  redirect("/data-pegawai");
}

export async function deletePegawaiAction(formData: FormData) {
  await requireAdmin();
  const id = formField(formData, "id");

  let failed = false;
  try {
    await execute("DELETE FROM pegawai WHERE id = ?", [id]);
  } catch {
    failed = true; // foreign key: still referenced by user / absen
  }
  if (failed) {
    redirect(withError("/data-pegawai", "Data gagal dihapus! Pegawai masih terhubung dengan data user atau absensi."));
  }
  redirect("/data-pegawai");
}

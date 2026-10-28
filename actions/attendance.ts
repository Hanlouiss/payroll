"use server";

import { redirect } from "next/navigation";
import { execute } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { formField, nowJakarta } from "@/lib/format";

export async function tapAction(formData: FormData) {
  const session = await requireUser();
  const status = formField(formData, "status");
  if (status !== "Tap In" && status !== "Tap Out") redirect("/");

  await execute("INSERT INTO absen (id_pegawai, tgl_tap, status) VALUES (?, ?, ?)", [
    session.idPegawai,
    nowJakarta(),
    status,
  ]);

  const home = session.role === "1" ? "/" : "/karyawan";
  redirect(`${home}?notif=${status === "Tap In" ? "in" : "out"}`);
}

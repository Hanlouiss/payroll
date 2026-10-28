"use server";

import { redirect } from "next/navigation";
import { execute, query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formField } from "@/lib/format";
import type { Pegawai } from "@/lib/types";

const withError = (message: string) => `/generate-payroll?error=${encodeURIComponent(message)}`;
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);

export async function calculatePayrollAction(formData: FormData) {
  await requireAdmin();

  const employeeId = formField(formData, "nama_karyawan");
  const startDate = formField(formData, "startDate");
  const endDate = formField(formData, "endDate");
  const keterangan = formField(formData, "keterangan");

  if (!employeeId) redirect(withError("Pilih karyawan terlebih dahulu."));
  if (!isDate(startDate) || !isDate(endDate) || startDate > endDate) {
    redirect(withError("Rentang tanggal tidak valid."));
  }

  const [emp] = await query<Pegawai>(
    "SELECT nama, gaji_pokok, kerja_1_bulan, jam_Kerja FROM pegawai WHERE id = ?",
    [employeeId]
  );
  if (!emp) redirect(withError("Data pegawai tidak ditemukan."));

  const salary = Number(emp.gaji_pokok);
  const totalWorkingDays = Number(emp.kerja_1_bulan);
  const dailyWorkingHours = Number(emp.jam_Kerja);
  const totalHoursToFill = totalWorkingDays * dailyWorkingHours;

  if (!Number.isFinite(salary) || !(totalHoursToFill > 0)) {
    redirect(withError("Gaji pokok / jam kerja pegawai belum valid. Periksa Data Pegawai."));
  }

  // Same logic as the PHP version: per day, last tap minus first tap, summed over the period.
  const [row] = await query<{ totalSeconds: string | number | null }>(
    `SELECT SUM(TIMESTAMPDIFF(SECOND, min_tap, max_tap)) AS totalSeconds
       FROM (
         SELECT MIN(tgl_tap) AS min_tap, MAX(tgl_tap) AS max_tap
           FROM absen
          WHERE id_pegawai = ?
            AND DATE(tgl_tap) BETWEEN ? AND ?
            AND status IN ('Tap In', 'Tap Out')
          GROUP BY DATE(tgl_tap)
       ) AS daily`,
    [employeeId, startDate, endDate]
  );

  const totalSeconds = Number(row?.totalSeconds ?? 0);
  const totalHoursWorked = totalSeconds / 3600;
  const hourlyRate = salary / totalHoursToFill;
  const totalWages = hourlyRate * totalHoursWorked;

  // hasil_gaji.total_hours / total_wages are INT columns, so round explicitly.
  const result = await execute(
    "INSERT INTO hasil_gaji (employeeName, startdate, enddate, total_hours, total_wages, keterangan) VALUES (?, ?, ?, ?, ?, ?)",
    [emp.nama, startDate, endDate, Math.round(totalHoursWorked), Math.round(totalWages), keterangan]
  );

  redirect(`/generate-payroll/result?id=${result.insertId}`);
}

export async function deleteGajiAction(formData: FormData) {
  await requireAdmin();
  const id = formField(formData, "id");
  await execute("DELETE FROM hasil_gaji WHERE id = ?", [id]);
  redirect("/data-gaji");
}

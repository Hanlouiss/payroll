import Link from "next/link";
import { ErrorBanner } from "./ui";
import type { Pegawai } from "@/lib/types";

export default function PegawaiForm({
  action,
  pegawai,
  submitLabel,
  error,
}: {
  action: (formData: FormData) => Promise<void>;
  pegawai?: Pegawai;
  submitLabel: string;
  error?: string;
}) {
  return (
    <form action={action}>
      <ErrorBanner message={error} />

      <label htmlFor="id">Id:</label>
      <input type="text" name="id" id="id" defaultValue={pegawai?.id ?? ""} readOnly={Boolean(pegawai)} required />

      <label htmlFor="nama">Nama Pegawai:</label>
      <input type="text" name="nama" id="nama" defaultValue={pegawai?.nama ?? ""} required />

      <label htmlFor="alamat">Alamat:</label>
      <input type="text" name="alamat" id="alamat" defaultValue={pegawai?.alamat ?? ""} required />

      <label htmlFor="tgl_lahir">Tanggal Lahir:</label>
      <input type="date" name="tgl_lahir" id="tgl_lahir" defaultValue={pegawai?.tgl_lahir ?? ""} required />

      <label htmlFor="divisi">Divisi:</label>
      <input type="text" name="divisi" id="divisi" defaultValue={pegawai?.divisi ?? ""} required />

      <label htmlFor="gaji_pokok">Gaji Pokok:</label>
      <input type="number" min="0" name="gaji_pokok" id="gaji_pokok" defaultValue={pegawai?.gaji_pokok ?? ""} required />

      <label htmlFor="kerja_1_bulan">Kerja 1 Bulan (hari):</label>
      <input type="number" min="1" name="kerja_1_bulan" id="kerja_1_bulan" defaultValue={pegawai?.kerja_1_bulan ?? ""} required />

      <label htmlFor="jam_Kerja">Jam Kerja (per hari):</label>
      <input type="number" min="1" step="any" name="jam_Kerja" id="jam_Kerja" defaultValue={pegawai?.jam_Kerja ?? ""} required />

      <div className="button-container">
        <button type="submit" className="btn btn-pill">{submitLabel}</button>
        <Link href="/data-pegawai" className="btn btn-pill">Kembali</Link>
      </div>
    </form>
  );
}

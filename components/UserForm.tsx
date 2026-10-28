import Link from "next/link";
import { ErrorBanner } from "./ui";
import type { User } from "@/lib/types";

export default function UserForm({
  action,
  pegawaiList,
  user,
  submitLabel,
  error,
}: {
  action: (formData: FormData) => Promise<void>;
  pegawaiList: { id: string; nama: string | null }[];
  user?: User;
  submitLabel: string;
  error?: string;
}) {
  const isEdit = Boolean(user);

  return (
    <form action={action}>
      <ErrorBanner message={error} />

      <label htmlFor="id">Id:</label>
      <input type="text" name="id" id="id" defaultValue={user?.id ?? ""} readOnly={isEdit} required />

      <label htmlFor="id_pegawai">Pegawai:</label>
      <select name="id_pegawai" id="id_pegawai" defaultValue={user?.id_pegawai ?? ""} required>
        <option value="" disabled>-- Pilih pegawai --</option>
        {pegawaiList.map((p) => (
          <option key={p.id} value={p.id}>
            {p.id} - {p.nama}
          </option>
        ))}
      </select>

      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" defaultValue={user?.username ?? ""} required />

      <label htmlFor="password">Password{isEdit ? " (kosongkan jika tidak diubah)" : ""}:</label>
      <input type="password" name="password" id="password" required={!isEdit} autoComplete="new-password" />

      <label htmlFor="hak_akses">Hak Akses:</label>
      <select name="hak_akses" id="hak_akses" defaultValue={user?.hak_akses ?? "2"} required>
        <option value="1">1 - Admin</option>
        <option value="2">2 - Karyawan</option>
      </select>

      <div className="button-container">
        <button type="submit" className="btn btn-pill">{submitLabel}</button>
        <Link href="/data-user" className="btn btn-pill">Kembali</Link>
      </div>
    </form>
  );
}

import { BackLink, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { Absen } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function RecapAbsenPage() {
  await requireAdmin();
  const rows = await query<Absen>("SELECT id_pegawai, tgl_tap, status FROM absen ORDER BY tgl_tap DESC");

  return (
    <>
      <PageHeader title="Data Absensi" />
      <div className="container">
        {rows.length === 0 ? (
          <p>Tidak ada data absensi.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID Pegawai</th>
                  <th>Tanggal Tap</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.id_pegawai}</td>
                    <td>{r.tgl_tap}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <BackLink href="/" />
      </div>
    </>
  );
}

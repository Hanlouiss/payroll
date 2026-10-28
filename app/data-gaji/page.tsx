import Link from "next/link";
import { deleteGajiAction } from "@/actions/payroll";
import DeleteButton from "@/components/DeleteButton";
import { BackLink, LogoutButton, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { formatRupiah } from "@/lib/format";
import type { HasilGaji } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DataGajiPage() {
  await requireAdmin();
  const rows = await query<HasilGaji>("SELECT * FROM hasil_gaji ORDER BY id DESC");

  return (
    <>
      <PageHeader title="Data Gaji" />
      <div className="container">
        <div className="toolbar">
          <Link className="btn btn-green" href="/generate-payroll">Penetapan Gaji</Link>
          <LogoutButton />
        </div>

        {rows.length === 0 ? (
          <p>Tidak ada data Gaji.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nama Pegawai</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Akhir</th>
                  <th>Total Jam</th>
                  <th>Total Gaji</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((g) => (
                  <tr key={g.id}>
                    <td>{g.employeeName}</td>
                    <td>{g.startdate}</td>
                    <td>{g.enddate}</td>
                    <td>{g.total_hours}</td>
                    <td>{formatRupiah(g.total_wages)}</td>
                    <td>{g.keterangan}</td>
                    <td className="actions">
                      <form action={deleteGajiAction}>
                        <input type="hidden" name="id" value={g.id} />
                        <DeleteButton />
                      </form>
                    </td>
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

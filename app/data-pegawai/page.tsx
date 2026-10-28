import Link from "next/link";
import { deletePegawaiAction } from "@/actions/pegawai";
import DeleteButton from "@/components/DeleteButton";
import { BackLink, ErrorBanner, LogoutButton, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { Pegawai } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DataPegawaiPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  const rows = await query<Pegawai>("SELECT * FROM pegawai ORDER BY id");

  return (
    <>
      <PageHeader title="Data Pegawai" />
      <div className="container">
        <div className="toolbar">
          <Link className="btn btn-green" href="/data-pegawai/create">Create</Link>
          <LogoutButton />
        </div>

        <ErrorBanner message={searchParams.error} />

        {rows.length === 0 ? (
          <p>Tidak ada data pegawai.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Pegawai</th>
                  <th>Alamat</th>
                  <th>Tanggal Lahir</th>
                  <th>Divisi</th>
                  <th>Gaji Pokok</th>
                  <th>Kerja 1 Bulan</th>
                  <th>Jam Kerja</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nama}</td>
                    <td>{p.alamat}</td>
                    <td>{p.tgl_lahir}</td>
                    <td>{p.divisi}</td>
                    <td>{p.gaji_pokok}</td>
                    <td>{p.kerja_1_bulan}</td>
                    <td>{p.jam_Kerja}</td>
                    <td className="actions">
                      <Link className="btn" href={`/data-pegawai/${encodeURIComponent(p.id)}/edit`}>Update</Link>
                      <form action={deletePegawaiAction}>
                        <input type="hidden" name="id" value={p.id} />
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

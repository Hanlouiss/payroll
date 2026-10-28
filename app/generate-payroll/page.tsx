import { calculatePayrollAction } from "@/actions/payroll";
import { BackLink, ErrorBanner, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GeneratePayrollPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  const employees = await query<{ id: string; nama: string | null }>("SELECT id, nama FROM pegawai ORDER BY nama");

  return (
    <>
      <PageHeader title="Generate Payroll" />
      <div className="container">
        <ErrorBanner message={searchParams.error} />

        {employees.length === 0 ? (
          <p>Tidak ada data pegawai.</p>
        ) : (
          <form action={calculatePayrollAction}>
            <label htmlFor="nama_karyawan">Nama Karyawan:</label>
            <select name="nama_karyawan" id="nama_karyawan" required>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nama}
                </option>
              ))}
            </select>

            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" required />

            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" required />

            <label htmlFor="keterangan">Keterangan:</label>
            <textarea name="keterangan" id="keterangan" rows={4} />

            <button type="submit" className="btn btn-green">Kalkulasi</button>
          </form>
        )}
        <BackLink href="/data-gaji" />
      </div>
    </>
  );
}

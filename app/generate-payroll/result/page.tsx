import { notFound } from "next/navigation";
import { BackLink, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { formatRupiah } from "@/lib/format";
import type { HasilGaji } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PayrollResultPage({ searchParams }: { searchParams: { id?: string } }) {
  await requireAdmin();
  const id = Number(searchParams.id);
  if (!Number.isInteger(id)) notFound();

  const [g] = await query<HasilGaji>("SELECT * FROM hasil_gaji WHERE id = ?", [id]);
  if (!g) notFound();

  return (
    <>
      <PageHeader title="Payroll Result" />
      <div className="container">
        <div className="table-wrap">
          <table>
            <tbody>
              <tr><th>Nama Karyawan</th><td>{g.employeeName}</td></tr>
              <tr><th>Start Date</th><td>{g.startdate}</td></tr>
              <tr><th>End Date</th><td>{g.enddate}</td></tr>
              <tr><th>Total Hours Worked</th><td>{g.total_hours}</td></tr>
              <tr><th>Total Wages</th><td>{formatRupiah(g.total_wages)}</td></tr>
              <tr><th>Keterangan</th><td>{g.keterangan}</td></tr>
            </tbody>
          </table>
        </div>
        <BackLink href="/generate-payroll" />
      </div>
    </>
  );
}

import { notFound } from "next/navigation";
import { updatePegawaiAction } from "@/actions/pegawai";
import PegawaiForm from "@/components/PegawaiForm";
import { PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { Pegawai } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPegawaiPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  await requireAdmin();
  const [pegawai] = await query<Pegawai>("SELECT * FROM pegawai WHERE id = ?", [decodeURIComponent(params.id)]);
  if (!pegawai) notFound();

  return (
    <>
      <PageHeader title="Update Data Pegawai" />
      <div className="container">
        <PegawaiForm action={updatePegawaiAction} pegawai={pegawai} submitLabel="Update" error={searchParams.error} />
      </div>
    </>
  );
}

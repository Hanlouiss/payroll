import { createPegawaiAction } from "@/actions/pegawai";
import PegawaiForm from "@/components/PegawaiForm";
import { PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function CreatePegawaiPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  return (
    <>
      <PageHeader title="Tambah Data Pegawai" />
      <div className="container">
        <PegawaiForm action={createPegawaiAction} submitLabel="Tambah" error={searchParams.error} />
      </div>
    </>
  );
}

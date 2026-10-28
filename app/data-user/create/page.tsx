import { createUserAction } from "@/actions/user";
import UserForm from "@/components/UserForm";
import { PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CreateUserPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  const pegawaiList = await query<{ id: string; nama: string | null }>("SELECT id, nama FROM pegawai ORDER BY id");

  return (
    <>
      <PageHeader title="Tambah Data User" />
      <div className="container">
        <UserForm action={createUserAction} pegawaiList={pegawaiList} submitLabel="Tambah" error={searchParams.error} />
      </div>
    </>
  );
}

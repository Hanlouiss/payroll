import { notFound } from "next/navigation";
import { updateUserAction } from "@/actions/user";
import UserForm from "@/components/UserForm";
import { PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { User } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  await requireAdmin();
  const [user] = await query<User>("SELECT id, id_pegawai, username, hak_akses FROM user WHERE id = ?", [
    decodeURIComponent(params.id),
  ]);
  if (!user) notFound();

  const pegawaiList = await query<{ id: string; nama: string | null }>("SELECT id, nama FROM pegawai ORDER BY id");

  return (
    <>
      <PageHeader title="Update Data User" />
      <div className="container">
        <UserForm
          action={updateUserAction}
          pegawaiList={pegawaiList}
          user={user}
          submitLabel="Ubah"
          error={searchParams.error}
        />
      </div>
    </>
  );
}

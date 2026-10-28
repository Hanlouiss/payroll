import Link from "next/link";
import { deleteUserAction } from "@/actions/user";
import DeleteButton from "@/components/DeleteButton";
import { BackLink, ErrorBanner, LogoutButton, PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { User } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DataUserPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  // Password column is intentionally not selected / shown.
  const rows = await query<User>("SELECT id, id_pegawai, username, hak_akses FROM user ORDER BY id");

  return (
    <>
      <PageHeader title="Data User" />
      <div className="container">
        <div className="toolbar">
          <Link className="btn btn-green" href="/data-user/create">Create</Link>
          <LogoutButton />
        </div>

        <ErrorBanner message={searchParams.error} />

        {rows.length === 0 ? (
          <p>Tidak ada data user.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Id Pegawai</th>
                  <th>Username</th>
                  <th>Nomor Hak Akses</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.id_pegawai}</td>
                    <td>{u.username}</td>
                    <td>{u.hak_akses}</td>
                    <td className="actions">
                      <Link className="btn" href={`/data-user/${encodeURIComponent(u.id)}/edit`}>Update</Link>
                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={u.id} />
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

import { redirect } from "next/navigation";
import { getSession } from "./session";

/** Any logged-in user. Redirects to /login otherwise. */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Admin only (hak_akses = 1). Employees are sent to their own page. */
export async function requireAdmin() {
  const session = await requireUser();
  if (session.role !== "1") redirect("/karyawan");
  return session;
}

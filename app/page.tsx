import AttendanceView from "@/components/AttendanceView";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: { searchParams: { notif?: string } }) {
  await requireAdmin();
  return <AttendanceView title="Absensi" notif={searchParams.notif} isAdmin />;
}

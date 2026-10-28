import AttendanceView from "@/components/AttendanceView";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function KaryawanHome({ searchParams }: { searchParams: { notif?: string } }) {
  await requireUser();
  return <AttendanceView title="Absensi untuk Karyawan" notif={searchParams.notif} isAdmin={false} />;
}

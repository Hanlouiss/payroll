import Link from "next/link";
import { tapAction } from "@/actions/attendance";
import Clock from "./Clock";
import Notification from "./Notification";
import { LogoutButton, PageHeader } from "./ui";

const MESSAGES: Record<string, string> = {
  in: "Anda sudah Tap In",
  out: "Anda sudah Tap Out",
};

export default function AttendanceView({
  title,
  notif,
  isAdmin,
}: {
  title: string;
  notif?: string;
  isAdmin: boolean;
}) {
  return (
    <>
      {isAdmin && (
        <nav className="top-buttons">
          <Link className="btn" href="/recap-absen">Recap Absen</Link>
          <Link className="btn" href="/data-pegawai">Data Pegawai</Link>
          <Link className="btn" href="/data-user">Data User</Link>
          <Link className="btn" href="/data-gaji">Data Gaji</Link>
        </nav>
      )}

      <PageHeader title={title} />
      <Clock />

      <div className="button-container">
        <form action={tapAction}>
          <input type="hidden" name="status" value="Tap In" />
          <button type="submit" className="btn btn-green btn-big">Tap In</button>
        </form>
        <form action={tapAction}>
          <input type="hidden" name="status" value="Tap Out" />
          <button type="submit" className="btn btn-red btn-big">Tap Out</button>
        </form>
      </div>

      <Notification message={notif ? MESSAGES[notif] : undefined} />

      <div className="logout-bottom">
        <LogoutButton />
      </div>
    </>
  );
}

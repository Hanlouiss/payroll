import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="header">
      <h1>{title}</h1>
    </div>
  );
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="btn btn-danger">
        Log Out
      </button>
    </form>
  );
}

export function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="error">{message}</p>;
}

export function BackLink({ href }: { href: string }) {
  return (
    <Link className="back-button" href={href}>
      Kembali
    </Link>
  );
}

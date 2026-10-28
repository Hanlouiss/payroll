import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Payroll & Absensi",
  description: "Sistem absensi dan penggajian pegawai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

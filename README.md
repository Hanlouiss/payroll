# Payroll & Absensi (Next.js + TypeScript)

Conversion of the PHP/XAMPP project `testing_payroll`. It still uses the same MySQL database (`testing_absen`).

## Run it

1. Start MySQL in XAMPP (Apache is no longer needed).
2. In phpMyAdmin, make sure the `testing_absen` database exists (import `database/testing_absen.sql` if not).
3. Copy `.env.example` to `.env.local` and fill in the DB settings and a long random `SESSION_SECRET`.
4. Install and start:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Old PHP file -> new route

| PHP | Next.js |
|---|---|
| login.php / logout.php | /login, `logoutAction` |
| index.php (admin) | / |
| index_karyawan.php | /karyawan |
| tapin*.php / tapout*.php | `actions/attendance.ts` |
| Recap_Absen/read.php | /recap-absen |
| Data_Pegawai/* | /data-pegawai, /create, /[id]/edit |
| Data_User/* | /data-user, /create, /[id]/edit |
| Data_Gaji/* | /data-gaji |
| generate_payrol.php, calculate_payroll.php, display_payroll.php | /generate-payroll, /generate-payroll/result |
| koneksi.php | lib/db.ts + .env.local |

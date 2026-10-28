export type Role = "1" | "2"; // 1 = admin, 2 = karyawan

export type SessionData = {
  idPegawai: string;
  role: Role;
};

export type LoginState = { error: string } | null;

export type Pegawai = {
  id: string;
  nama: string | null;
  alamat: string | null;
  tgl_lahir: string | null;
  divisi: string | null;
  gaji_pokok: string | null;
  kerja_1_bulan: string | null;
  jam_Kerja: string | null;
};

export type User = {
  id: string;
  username: string | null;
  password: string | null;
  id_pegawai: string | null;
  hak_akses: string | null;
};

export type Absen = {
  id_pegawai: string | null;
  tgl_tap: string | null;
  status: "Tap In" | "Tap Out" | null;
};

export type HasilGaji = {
  id: number;
  employeeName: string | null;
  startdate: string | null;
  enddate: string | null;
  total_hours: number | null;
  total_wages: number | null;
  keterangan: string | null;
};

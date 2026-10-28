export function formatRupiah(value: number | string | null | undefined) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));
}

/** "YYYY-MM-DD HH:mm:ss" in Asia/Jakarta, same as date_default_timezone_set('Asia/Jakarta') in PHP. */
export function nowJakarta() {
  return new Date().toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" });
}

export function formField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

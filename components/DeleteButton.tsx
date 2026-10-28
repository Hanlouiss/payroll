"use client";

export default function DeleteButton({ label = "Delete" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="btn btn-danger"
      onClick={(e) => {
        if (!window.confirm("Yakin ingin menghapus data ini?")) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}

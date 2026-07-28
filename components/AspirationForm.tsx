"use client";

import { useState } from "react";
import {
  Send,
  User,
  School,
  MessageSquareText,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function AspirationForm() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [isiAspirasi, setIsiAspirasi] = useState("");
  const [isAnonim, setIsAnonim] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isiAspirasi.trim()) {
      setStatus({ type: "error", message: "Isi aspirasi wajib diisi ya!" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: isAnonim ? "Anonim" : nama,
          kelas: isAnonim ? "-" : kelas,
          isiAspirasi,
          isAnonim,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengirim aspirasi.");
      }

      setStatus({
        type: "success",
        message: "Aspirasimu berhasil terkirim. Terima kasih sudah bersuara!",
      });
      setNama("");
      setKelas("");
      setIsiAspirasi("");
      setIsAnonim(false);
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan, coba lagi ya.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl rounded-2xl border-4 border-brutal-black bg-white p-6 shadow-brutal-lg sm:p-8"
    >
      {/* Nama */}
      <div className="mb-5">
        <label
          htmlFor="nama"
          className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide"
        >
          <User className="h-4 w-4" strokeWidth={2.5} />
          Nama
          <span className="font-body text-xs font-normal normal-case text-black/50">
            (opsional)
          </span>
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          value={isAnonim ? "Anonim" : nama}
          onChange={(e) => setNama(e.target.value)}
          disabled={isAnonim}
          placeholder="Nama kamu..."
          className="input-brutal w-full rounded-lg border-4 border-brutal-black bg-cream px-4 py-3 font-body font-medium placeholder:text-black/40 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/50"
        />
      </div>

      {/* Kelas */}
      <div className="mb-5">
        <label
          htmlFor="kelas"
          className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide"
        >
          <School className="h-4 w-4" strokeWidth={2.5} />
          Kelas
          <span className="font-body text-xs font-normal normal-case text-black/50">
            (opsional)
          </span>
        </label>
        <input
          id="kelas"
          name="kelas"
          type="text"
          value={isAnonim ? "-" : kelas}
          onChange={(e) => setKelas(e.target.value)}
          disabled={isAnonim}
          placeholder="Misal: XII IPA 1"
          className="input-brutal w-full rounded-lg border-4 border-brutal-black bg-cream px-4 py-3 font-body font-medium placeholder:text-black/40 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/50"
        />
      </div>

      {/* Toggle Anonim */}
      <button
        type="button"
        onClick={() => setIsAnonim((v) => !v)}
        aria-pressed={isAnonim}
        className="brutal-press brutal-press-sm mb-6 flex w-full items-center justify-between rounded-lg border-4 border-brutal-black bg-brutal-yellow px-4 py-3 shadow-brutal-sm"
      >
        <span className="font-display text-sm font-bold uppercase tracking-wide">
          Kirim sebagai anonim
        </span>
        <span
          className={`relative h-7 w-12 shrink-0 rounded-full border-4 border-brutal-black transition-colors duration-200 ${
            isAnonim ? "bg-brutal-teal" : "bg-white"
          }`}
        >
          <span
            className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-brutal-black bg-brutal-black transition-all duration-200 ${
              isAnonim ? "left-[22px]" : "left-[2px]"
            }`}
          />
        </span>
      </button>

      {/* Isi Aspirasi */}
      <div className="mb-6">
        <label
          htmlFor="isiAspirasi"
          className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide"
        >
          <MessageSquareText className="h-4 w-4" strokeWidth={2.5} />
          Isi Aspirasi
          <span className="text-brutal-coral">*</span>
        </label>
        <textarea
          id="isiAspirasi"
          name="isiAspirasi"
          required
          value={isiAspirasi}
          onChange={(e) => setIsiAspirasi(e.target.value)}
          rows={6}
          placeholder="Tulis aspirasi, kritik, atau saranmu di sini..."
          className="input-brutal w-full resize-none rounded-lg border-4 border-brutal-black bg-cream px-4 py-3 font-body font-medium placeholder:text-black/40"
        />
      </div>

      {/* Status */}
      {status.type !== "idle" && (
        <div
          role="status"
          className={`mb-5 flex items-center gap-2 rounded-lg border-4 border-brutal-black px-4 py-3 font-body font-semibold ${
            status.type === "success"
              ? "bg-brutal-teal"
              : "bg-brutal-coral text-white"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 shrink-0" />
          )}
          <span className="text-sm sm:text-base">{status.message}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="brutal-press brutal-press-lg flex w-full items-center justify-center gap-2 rounded-lg border-4 border-brutal-black bg-brutal-coral py-4 font-display text-lg font-bold uppercase tracking-wide text-white shadow-brutal disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" strokeWidth={2.5} />
            Kirim Aspirasi
          </>
        )}
      </button>
    </form>
  );
}

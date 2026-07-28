import { NextRequest, NextResponse } from "next/server";

// Force this route to always run dynamically (never statically cached),
// since every request sends a fresh message to Telegram.
export const dynamic = "force-dynamic";

type RequestBody = {
  nama?: string;
  kelas?: string;
  isiAspirasi?: string;
  isAnonim?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { nama, kelas, isiAspirasi, isAnonim } = body;

    // Validasi: isi aspirasi wajib diisi
    if (!isiAspirasi || !isiAspirasi.trim()) {
      return NextResponse.json(
        { success: false, message: "Isi aspirasi wajib diisi." },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error(
        "TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum diset di environment variables."
      );
      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi server belum lengkap. Hubungi admin.",
        },
        { status: 500 }
      );
    }

    const namaFinal = isAnonim ? "Anonim" : nama?.trim() || "Anonim";
    const kelasFinal = isAnonim ? "-" : kelas?.trim() || "-";
    const pesanFinal = isiAspirasi.trim();

    // Format pesan rapi untuk Telegram (plain text, aman dari karakter
    // markdown seperti _ atau * yang bisa membuat Telegram menolak pesan)
    const text = [
      "📬 <b>Aspirasi Baru — HMPS PAI</b>",
      "",
      `<b>👤 Nama:</b> ${namaFinal}`,
      `<b>🏫 Kelas:</b> ${kelasFinal}`,
      `<b>💬 Pesan:</b> "${pesanFinal}"`,
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error("Telegram API error:", telegramData);
      return NextResponse.json(
        { success: false, message: "Gagal mengirim aspirasi ke Telegram." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Aspirasi berhasil dikirim!",
    });
  } catch (error) {
    console.error("Error di /api/send-telegram:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

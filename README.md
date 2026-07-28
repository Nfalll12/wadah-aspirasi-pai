# Wadah Aspirasi PAI

Platform sederhana bergaya **Neo Brutalism** untuk siswa/mahasiswa mengirim aspirasi, kritik, atau saran seputar PAI — langsung masuk ke Telegram admin, tanpa database.

## 1. Jalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 2. Setup Bot Telegram

1. **Buat bot baru**
   - Chat dengan [@BotFather](https://t.me/BotFather) di Telegram.
   - Kirim `/newbot`, ikuti instruksinya (beri nama & username bot).
   - BotFather akan memberi **token**, contoh: `123456789:AAExampleToken...`. Ini nilai `TELEGRAM_BOT_TOKEN`.

2. **Dapatkan Chat ID**
   - Jika ingin notifikasi masuk ke chat pribadi kamu: chat bot barusan dengan pesan apa saja (misal "halo"), lalu buka:
     `https://api.telegram.org/bot<TOKEN>/getUpdates`
     Cari field `"chat":{"id": ...}` — itu `TELEGRAM_CHAT_ID` kamu.
   - Jika ingin masuk ke **grup**: tambahkan bot ke grup tersebut, kirim pesan apa saja di grup, lalu cek URL `getUpdates` yang sama. ID grup biasanya berupa angka **negatif** (contoh: `-1001234567890`).
   - Alternatif cepat untuk chat pribadi: chat [@userinfobot](https://t.me/userinfobot) untuk melihat ID Telegram kamu sendiri.

3. **Isi environment variable secara lokal**
   - Copy `.env.local.example` menjadi `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Isi dengan token & chat ID asli kamu:
     ```
     TELEGRAM_BOT_TOKEN=123456789:AAExampleTokenReplaceThisWithYourOwn
     TELEGRAM_CHAT_ID=123456789
     ```
   - **Jangan pernah** commit file `.env.local` ke Git (sudah otomatis di-ignore lewat `.gitignore`).

## 3. Deploy ke Vercel

1. Push project ini ke GitHub/GitLab/Bitbucket.
2. Import project di [vercel.com/new](https://vercel.com/new).
3. Di halaman **Settings → Environment Variables**, tambahkan:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Deploy. Selesai — form aspirasi sudah live dan terhubung ke Telegram, tanpa bot token pernah terekspos ke browser (karena dikirim lewat Route Handler `/api/send-telegram` yang berjalan di server/Vercel Function, bukan di client).

## Struktur proyek

```
app/
  layout.tsx              # Root layout, font (Space Grotesk + Inter), metadata
  page.tsx                # Halaman utama: header + form
  globals.css             # Tailwind + utility class efek "tekan" Neo Brutalism
  api/
    send-telegram/
      route.ts            # Serverless function: terima form, kirim ke Telegram
components/
  AspirationForm.tsx       # Form aspirasi (client component)
  FloatingDecor.tsx        # Awan, bintang, kotak yang melayang di background
tailwind.config.ts         # Warna, shadow keras, animasi float/drift
```

## Catatan teknis

- Form **tidak** mengharuskan Nama/Kelas diisi. Jika toggle **Anonim** diaktifkan, kedua field otomatis disabled dan dikirim sebagai `"Anonim"` / `"-"`.
- `Isi Aspirasi` wajib diisi (divalidasi di client & di server sebelum dikirim ke Telegram).
- Pesan ke Telegram dikirim sebagai plain text (bukan Markdown) agar karakter seperti `*` atau `_` yang mungkin ditulis siswa tidak membuat Telegram menolak pesan.

# Soal 2: Landing Page Startup ERP

Website pencatatan barang masuk/keluar dan keuntungan harian untuk pengusaha, dengan sistem paket (TIER). Dibuat dengan React dan TypeScript, mengikuti tema desain pada soal.

Dokumentasi teknologi dan alasan pemilihannya: [`docs/TECHNOLOGY.md`](./docs/TECHNOLOGY.md).

## Fitur

- **Home**: Navbar dengan blob gradient (berubah menjadi bar putih saat di-scroll), headline, ilustrasi, dan blob gradient biru-ungu
- **About**: tiga keunggulan produk dan pratinjau grafik penjualan interaktif (fitur Tier Business)
- **Pricing**: tiga paket Basic, Business, Entrepreneur dengan toggle bulanan/tahunan (tahunan membayar 10 bulan)
- **Contact**: info kontak yang bisa diklik, form dengan validasi, penghitung karakter, status loading, dan panel sukses
- **Login** (`/login`): halaman terpisah dengan validasi dan tombol tampilkan/sembunyikan password; login yang lolos validasi diarahkan ke Home
- Menu navbar menyala sesuai section yang sedang dilihat, scroll halus, animasi masuk saat scroll
- Responsive dari 360px sampai layar lebar

Tanpa backend: login, form kontak, harga, dan data grafik hanya simulasi tampilan.

## Menjalankan

```bash
npm install
npm run dev
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server di `http://localhost:5173` |
| `npm run build` | Cek tipe lalu build produksi ke `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run lint` | ESLint |
| `npm test` | Vitest (watch mode) |
| `npm run test:run` | Vitest sekali jalan |

## Struktur

```
src/
├─ assets/svg/                 ilustrasi (unDraw)
├─ components/
│  ├─ About/  Contact/  Footer/  Hero/  Navbar/  Pricing/
│  ├─ Reveal/                  pembungkus animasi masuk saat scroll
│  ├─ SalesChart/              grafik SVG (tanpa library)
│  ├─ SectionDivider/          pemisah gelombang antar section
│  └─ ui/                      komponen reusable: Button, FormField, Input, Textarea, PasswordInput
├─ data/                       data paket (tiers) dan data grafik (sales)
├─ hooks/                      useInView, useActiveSection
├─ pages/                      Home, Login
├─ styles/                     _variables, _mixins, _animations, main
├─ App.tsx                     definisi route
└─ main.tsx
```

Prinsip yang dipakai:
- File `.tsx` hanya mengekspor komponen. Data, konstanta, dan fungsi bantu (misalnya `validate`, `chartUtils`, `tiers`) ada di file `.ts` terpisah. Ini juga syarat Fast Refresh.
- Logika validasi berupa fungsi murni sehingga mudah diuji tanpa merender komponen.
- Komponen form dan tombol dibuat sekali di `components/ui` dan dipakai ulang di Contact dan Login.

## Pengujian

```bash
npm run test:run
```

Memakai Vitest, Testing Library, dan user-event. Komponen diuji dari sisi pengguna (role, label, teks), bukan detail implementasi. Fungsi murni (validasi, perhitungan harga, skala grafik) diuji terpisah.

## Deploy

Di Vercel, atur **Root Directory** ke `test-2-landing-page`. Build command `npm run build`, output `dist`. File `vercel.json` mengarahkan semua path ke `index.html` agar route `/login` tetap bisa dibuka langsung atau di-refresh.

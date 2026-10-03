# KeDA Tech Test: Frontend Coding Assignment

Repositori ini berisi pengerjaan dua soal KeDA Tech Test dalam satu repo.

| Soal | Isi | Folder | Stack |
|---|---|---|---|
| 1 | Tiga fungsi algoritma (sorting manual, sliding window, penelusuran objek bersarang) beserta unit test | [`test-1-algorithms`](./test-1-algorithms) | TypeScript, Vitest, fast-check |
| 2 | Website landing page startup ERP: Home, About, Pricing, Contact, dan halaman Login | [`test-2-landing-page`](./test-2-landing-page) | React, TypeScript, Vite, SASS |

**Demo Soal 2:** _isi dengan URL Vercel setelah deploy_

<!--
Tambahkan screenshot setelah deploy, simpan di docs/screenshots/:
![Home](docs/screenshots/home.png)
-->

## Struktur repositori

```
keda-tech-test/
├─ test-1-algorithms/        Soal 1: fungsi algoritma + unit test
│  ├─ src/
│  └─ README.md              penjelasan algoritma dan kompleksitas
├─ test-2-landing-page/      Soal 2: aplikasi React
│  ├─ src/
│  ├─ docs/TECHNOLOGY.md     dokumentasi teknologi dan alasan pemilihannya
│  └─ README.md
└─ README.md
```

Kedua folder adalah project terpisah dengan `package.json` masing-masing. Dependency dipasang di dalam folder yang bersangkutan.

## Menjalankan

Prasyarat: Node.js LTS terbaru (disarankan 20.19 atau lebih baru).

### Soal 1

```bash
cd test-1-algorithms
npm install
npm run test:run        # jalankan semua test sekali
npm run test:coverage   # dengan laporan coverage
npm run typecheck       # cek tipe TypeScript
```

### Soal 2

```bash
cd test-2-landing-page
npm install
npm run dev             # http://localhost:5173
npm run test:run        # unit test
npm run build           # build produksi ke dist/
```

Daftar lengkap script ada di README masing-masing folder.

## Kesesuaian dengan ketentuan soal

### Soal 1

| Ketentuan | Keterangan |
|---|---|
| Dikerjakan menggunakan GitHub | Repositori ini |
| Melampirkan unit test | Satu file test untuk tiap fungsi: contoh dari soal, kasus tepi, dan property-based test |

### Soal 2

| Ketentuan | Keterangan |
|---|---|
| Menggunakan React JS | React dengan function component dan hooks, ditulis dalam TypeScript |
| Menggunakan SASS (opsional) | SCSS dengan variabel, mixin, dan penamaan BEM |
| Responsive | Mobile-first, breakpoint 768px dan 1024px, menu hamburger di layar kecil |
| Desain mengikuti tampilan referensi | Navbar dengan blob gradient, ilustrasi unDraw, blob gradient biru-ungu di sisi kanan bawah, palet dan tipografi diturunkan dari desain |
| Section About, Pricing, Contact | Halaman bisa di-scroll, menu menyala sesuai section yang sedang dilihat |
| Pricing mengikuti sistem TIER | Tiga paket (Basic, Business, Entrepreneur) dengan toggle bulanan/tahunan |
| Tombol LOGIN (halaman baru atau popup) | Halaman baru `/login` memakai React Router |
| Tanpa backend, cukup tampilan | Login dan form kontak hanya validasi dan simulasi pengiriman |
| Dokumentasi teknologi dan alasannya | [`test-2-landing-page/docs/TECHNOLOGY.md`](./test-2-landing-page/docs/TECHNOLOGY.md) |
| Animasi (opsional) | Animasi masuk saat scroll, animasi pembuka Hero, grafik animasi; menghormati `prefers-reduced-motion` |
| Framework tambahan (opsional) | Hanya `react-router-dom` dan `react-icons`; grafik dan animasi dibuat tanpa library |

## Deploy

Soal 2 di-deploy ke Vercel. Karena repo berisi dua folder, atur **Root Directory** project Vercel ke `test-2-landing-page`. Preset Vite terdeteksi otomatis (build `npm run build`, output `dist`). File `vercel.json` mengarahkan semua path ke `index.html` supaya refresh di `/login` tidak menghasilkan 404.

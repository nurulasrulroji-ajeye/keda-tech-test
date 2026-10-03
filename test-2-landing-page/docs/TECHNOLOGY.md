# Dokumentasi Teknologi

Dokumen ini menjawab ketentuan soal: mendokumentasikan setiap teknologi yang dipakai beserta alasan pemilihannya. Versi paket yang persis ada di `package.json`.

## 1. Ringkasan stack

| Kategori | Teknologi | Dipakai untuk | Alasan dipilih |
|---|---|---|---|
| UI | **React** (function component + hooks) | Seluruh antarmuka | Wajib dari soal. Komponen kecil yang bisa dipakai ulang; hooks memungkinkan logika bersama (`useInView`) tanpa class atau wrapper. |
| Bahasa | **TypeScript** | Seluruh kode | Props dan data (`Tier`, `SalesPoint`, nilai form) bertipe, sehingga salah kirim props atau salah ketik field ketahuan saat menulis, bukan saat dijalankan. Autocomplete dan refactor lebih aman. |
| Build tool | **Vite** | Dev server dan build | Dev server dan HMR sangat cepat, konfigurasi minimal, build produksi memakai Rollup. Create React App sudah tidak dipelihara lagi. |
| Routing | **React Router** (`react-router-dom`) | Route `/` dan `/login`, redirect untuk path tidak dikenal | Navigasi client-side tanpa reload. Login dibuat sebagai halaman (bukan popup) agar punya URL sendiri, tombol Back berfungsi, dan tanggung jawab tiap halaman terpisah. |
| Styling | **SASS (SCSS)** + penamaan **BEM** | Seluruh style | Variabel untuk warna dan breakpoint, mixin (`tablet-up`, `desktop-up`, `decor-circle`), nesting yang rapi. BEM (`hero__title`) mencegah bentrok nama class tanpa library tambahan. |
| Animasi | **CSS keyframes dan transition** | Animasi masuk, float, grafik, hover | Hanya menganimasikan `transform` dan `opacity` sehingga ringan dan mulus. Semua dimatikan otomatis untuk pengguna dengan `prefers-reduced-motion`. |
| Deteksi scroll | **IntersectionObserver** (lewat hook `useInView` dan `useActiveSection`) | Animasi saat elemen terlihat, menu aktif | Lebih ringan daripada mendengarkan event `scroll` dan menghitung posisi manual. Observer dilepas setelah animasi selesai. |
| Grafik | **SVG murni** (komponen `SalesChart`) | Pratinjau grafik fitur Tier Business | Kebutuhannya hanya batang dan garis dengan data kecil. Tanpa library berarti tanpa tambahan ukuran bundle, dan animasi serta hover bisa dikontrol penuh. |
| Ikon | **react-icons** (set Feather) | Ikon menu, form, kontak | Setiap ikon diimpor satuan sehingga hanya ikon yang dipakai masuk bundle. |
| Font | **Open Sans** (Google Fonts) | Seluruh teks | Karakternya mendekati font pada desain referensi. Weight 400 sampai 800 dan italic asli dimuat dengan `display=swap` agar teks tidak menunggu font. |
| Ilustrasi | **unDraw** (SVG) | Ilustrasi Hero | Sumber yang disarankan soal. SVG tajam di semua ukuran layar dan warnanya disesuaikan dengan tema. |
| Format angka | **`Intl.NumberFormat`** (`id-ID`) | Harga rupiah | API bawaan browser, tidak perlu library untuk memformat `Rp 99.000`. |
| Unit test | **Vitest** + **Testing Library** + **user-event** + **jsdom** | Pengujian komponen dan fungsi | Vitest memakai konfigurasi Vite yang sama, cepat, dan API-nya kompatibel dengan Jest. Testing Library menguji dari sudut pandang pengguna (role, label, teks), dan user-event mensimulasikan interaksi nyata (mengetik, klik, tab). |
| Linting | **ESLint** (aturan `react-hooks` dan `react-refresh`) | Kualitas kode | `react-hooks` menangkap kesalahan dependency hooks. `react-refresh` memastikan file komponen hanya mengekspor komponen agar Fast Refresh bekerja. |
| Versi kode | **Git + GitHub** | Repositori | Dua soal dalam satu repo dengan folder terpisah dan riwayat commit terpisah. |
| Hosting | **Vercel** | Demo online | Deploy gratis langsung dari GitHub. `vercel.json` mengarahkan semua path ke `index.html` agar route client-side (`/login`) tidak 404 saat di-refresh. |

## 2. Alternatif yang tidak dipilih

| Alternatif | Alasan tidak dipilih |
|---|---|
| Create React App | Tidak dipelihara lagi; lebih lambat dari Vite |
| Tailwind CSS / library UI (MUI, Chakra) | Desain harus mengikuti tema referensi dengan bentuk khusus (blob, gelombang, gradient). Mengatur ulang style library lebih repot daripada menulis SCSS sendiri, dan menambah ukuran bundle |
| Styled-components / CSS-in-JS | Ada biaya runtime, sedangkan SCSS dikompilasi saat build |
| Recharts / Chart.js | Berlebihan untuk satu grafik batang dan garis. Layak dipertimbangkan bila grafik menjadi banyak dan datanya dinamis |
| Framer Motion | Animasi yang dibutuhkan cukup dengan CSS dan IntersectionObserver, tanpa tambahan dependency |
| React Hook Form / Formik | Form hanya 2 sampai 3 field. Validasi berupa fungsi murni lebih sederhana dan mudah diuji |
| Modal untuk Login | URL tidak bisa dibagikan, tombol Back tidak berfungsi, dan state modal perlu diangkat ke Navbar |
| Jest | Perlu konfigurasi transformasi tambahan untuk TypeScript dan ESM; Vitest sudah terintegrasi dengan Vite |

## 3. Keputusan arsitektur

**Komponen UI yang dipakai ulang (`components/ui`)**
- `Button` bersifat polymorphic lewat prop `as` (bisa `<button>`, `<a>`, atau `Link`), punya varian (`primary`, `outline`, `light`, `ghost`), ukuran, dan status `loading`.
- `FormField` membungkus label, pesan error atau petunjuk, dan penghitung karakter. `Input`, `Textarea`, dan `PasswordInput` memakainya sehingga semua field tampil dan berperilaku sama.
- Hubungan label dan input, `aria-invalid`, dan `aria-describedby` diatur di satu tempat sehingga otomatis konsisten di seluruh form.

**Pemisahan data dan logika**
- Data (`data/tiers.ts`, `data/sales.ts`) dipisah dari tampilan, sehingga mengubah harga atau fitur paket tidak menyentuh komponen.
- Validasi (`validate.ts`, `validateLogin.ts`) dan perhitungan (`getPrice`, `getNiceScale`) berupa fungsi murni yang diuji tanpa merender komponen.

**Design token**
- Warna, gradient, breakpoint, dan tinggi navbar didefinisikan sekali di `_variables.scss`. Perubahan tema cukup di satu file.
- Animasi dikumpulkan di `_animations.scss` dan dipakai lintas komponen.

**Logika Pricing**
- Paket tahunan membayar 10 bulan (gratis 2 bulan). Harga dihitung dari satu sumber (`getPrice`) dan setara per bulan dari `getMonthlyEquivalent`, sehingga angka di tampilan dan di test selalu konsisten.

## 4. Responsivitas

- **Mobile-first**: style dasar untuk layar kecil, lalu diperluas dengan mixin `tablet-up` (768px) dan `desktop-up` (1024px).
- Navbar berubah menjadi menu hamburger di layar kecil.
- Ukuran teks fluid dengan `clamp()` sehingga tipografi mengikuti lebar layar tanpa banyak breakpoint.
- Grid kartu berubah dari 1 kolom (mobile) ke 3 kolom (tablet dan desktop). Grafik memakai `viewBox` SVG sehingga mengecil proporsional.
- Konten lebar tidak menyebabkan scroll horizontal pada halaman.

## 5. Aksesibilitas

- Struktur heading berurutan dengan satu `h1` di Hero, dan elemen semantik (`header`, `nav`, `main`, `section`, `footer`, `article`).
- Label terhubung ke input, pesan error memakai `role="alert"`, dan field yang salah diberi `aria-invalid`. Saat submit gagal, fokus berpindah ke field pertama yang salah.
- Panel sukses di Contact menerima fokus sehingga diumumkan oleh screen reader.
- Ring fokus terlihat pada semua elemen interaktif, dan seluruh fitur bisa dipakai dengan keyboard.
- Elemen dekoratif (blob, gelombang, ikon) memakai `aria-hidden`.
- `prefers-reduced-motion` mematikan animasi dan scroll halus.

## 6. Strategi pengujian

- Komponen diuji lewat perilaku yang terlihat pengguna: mengetik, klik, tab, lalu memeriksa teks, role, dan atribut ARIA.
- Fungsi murni diuji langsung: validasi form, perhitungan harga tahunan, dan skala sumbu grafik.
- Kasus yang dicakup antara lain: submit form kosong dan fokus ke field pertama yang salah, validasi saat blur, penghitung karakter, toggle bulanan/tahunan, perpindahan rentang grafik, toggle tampilkan password, dan navigasi ke Home setelah login.
- Hook yang bergantung pada `IntersectionObserver` memiliki fallback sehingga konten tetap tampil di lingkungan tanpa API tersebut (jsdom).

## 7. Performa

- Hanya dua dependency runtime tambahan di luar React: `react-router-dom` dan `react-icons`.
- Grafik, animasi, dan pemisah section dibuat tanpa library.
- Animasi hanya memakai `transform` dan `opacity`; observer dilepas setelah elemen terlihat.
- Ilustrasi dan blob berupa SVG, sehingga ringan dan tidak buram di layar beresolusi tinggi.
- Font dimuat dengan `preconnect` dan `display=swap`.

## 8. Keterbatasan dan pengembangan lanjutan

- Tidak ada backend: login, pengiriman form, harga, dan data grafik adalah simulasi tampilan sesuai ketentuan soal.
- Belum ada state autentikasi. Langkah berikutnya: Context untuk status login sehingga tombol LOGIN di Navbar berubah menjadi LOGOUT, dan route yang diproteksi.
- Teks masih satu bahasa (Indonesia). Bila perlu multi-bahasa, tambahkan i18n.
- Bila grafik bertambah banyak atau datanya dinamis, pertimbangkan library grafik.

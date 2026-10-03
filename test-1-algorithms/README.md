# Soal 1: Algoritma

Tiga fungsi murni dalam TypeScript, masing-masing dengan unit test.

| Fungsi | Tugas | Algoritma | Waktu | Ruang |
|---|---|---|---|---|
| [`sortDescending`](./src/sortDescending.ts) | Urutkan angka dari terbesar ke terkecil tanpa fungsi sort bawaan | Bottom-up merge sort (iteratif) | O(n log n) | O(n) |
| [`maxSubarraySum`](./src/maxSubarraySum.ts) | Jumlah terbesar dari `k` elemen berurutan | Sliding window satu putaran | O(n) | O(1) |
| [`sumEvenNumbers`](./src/sumEvenNumbers.ts) | Jumlah semua bilangan genap di objek bersarang | DFS iteratif dengan stack eksplisit | O(n) | O(kedalaman) |

## Menjalankan

```bash
npm install
npm run test:run        # semua test sekali jalan
npm test                # watch mode
npm run test:coverage   # laporan coverage
npm run typecheck       # cek tipe
```

## 1. `sortDescending`

```ts
sortDescending([1, 2, 4, 3, 5, 3, 2, 1]); // [5, 4, 3, 3, 2, 2, 1, 1]
```

**Cara kerja.** Array dianggap kumpulan potongan terurut sepanjang 1. Potongan yang bersebelahan digabung berulang dengan lebar 1, 2, 4, 8, dan seterusnya sampai tersisa satu. Saat menggabung, elemen terbesar dari kedua potongan diambil lebih dulu.

```
[3, 1, 4, 2]
lebar 1:  [3 | 1] [4 | 2]  ->  [3, 1] [4, 2]
lebar 2:  [3, 1 | 4, 2]    ->  [4, 3, 2, 1]
```

**Keputusan desain**
- Tanpa `Array.prototype.sort`, `slice`, spread, maupun `Math.*`. Salinan dibuat lewat loop dengan index assignment, jadi array asli tidak berubah dan hasilnya selalu array baru.
- Iteratif, bukan rekursif, sehingga tidak ada risiko stack overflow pada array besar.
- Stabil: pada nilai yang sama, urutan asli dipertahankan (`>=` mendahulukan elemen kiri).
- Merge sort dipilih karena O(n log n) pada semua kasus. Bubble sort atau insertion sort O(n²) akan lambat pada input besar; ada test dengan 50.000 elemen.
- Input `NaN` tidak didukung karena perbandingan dengan `NaN` tidak terdefinisi.

## 2. `maxSubarraySum`

```ts
maxSubarraySum([100, 200, 300, 400], 2);          // 700
maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39
maxSubarraySum([-3, 4, 0, -2, 6, -1], 2);          // 5
```

**Cara kerja.** Jumlah window berikutnya didapat dari jumlah window sebelumnya: tambah elemen yang masuk, kurangi elemen yang keluar. Setiap elemen diproses satu kali masuk dan satu kali keluar, jadi tidak perlu menjumlah ulang `k` elemen (pendekatan naif O(n·k)).

```
[1, 4, 2, 10], k = 2
i=0  sum = 1
i=1  sum = 5               -> window penuh, terbesar = 5
i=2  sum = 5 + 2 - 1 = 6   -> terbesar = 6
i=3  sum = 6 + 10 - 4 = 12 -> terbesar = 12
```

**Keputusan desain**
- Nilai awal pembanding adalah `-Infinity`, bukan `0`, supaya array yang semuanya negatif tetap benar (`[-5, -2, -9]`, `k = 1` menghasilkan `-2`).
- Jika tidak ada window yang valid (`k` bukan bilangan bulat positif, atau `k` lebih besar dari panjang array), fungsi mengembalikan `null`. Soal tidak menjelaskan perilaku ini, sehingga `null` dipilih agar pemanggil dipaksa menangani kasusnya oleh tipe `number | null`.
- Untuk bilangan desimal, hasil bisa mengandung galat pembulatan floating point. Untuk bilangan bulat hasilnya selalu eksak.

## 3. `sumEvenNumbers`

```ts
sumEvenNumbers({ outer: 2, obj: { inner: 2, otherObj: { superInner: 2, notANumber: true, alsoNotANumber: 'yup' } } }); // 6
```

**Cara kerja.** Penelusuran depth-first memakai stack eksplisit (`Frame` berisi objek, daftar anak, dan indeks anak berikutnya). Setiap nilai diperiksa: angka genap ditambahkan ke total, objek atau array didorong ke stack, tipe lain diabaikan.

**Keputusan desain**
- Stack eksplisit, bukan rekursi, sehingga kedalaman nesting tidak dibatasi oleh call stack JavaScript. Ada test dengan 100.000 level.
- `typeof null === 'object'`, jadi `null` dicek terpisah.
- Hanya bilangan bulat yang dianggap genap: `2.5`, `NaN`, dan `Infinity` diabaikan. `0` dan bilangan negatif genap (`-2`) valid.
- Array di dalam objek ikut ditelusuri.
- Referensi melingkar tidak menyebabkan loop tak berujung. Penanda `onPath` hanya berisi objek pada jalur yang sedang ditelusuri, sehingga objek yang dipakai bersama di dua tempat tetap dihitung di tiap kemunculannya.

## Strategi pengujian

| Jenis | Isi |
|---|---|
| Contoh dari soal | Semua contoh input dan output soal |
| Kasus tepi | Array kosong, satu elemen, duplikat, negatif, desimal, `k` tidak valid, `null`, referensi melingkar |
| Invarian | Input tidak berubah, hasil adalah array baru, `Array.prototype.sort` tidak dipanggil |
| Skala | 50.000 elemen untuk sorting, nesting 100.000 level untuk DFS |
| Property-based ([fast-check](https://fast-check.dev)) | Ratusan input acak dibandingkan dengan oracle independen: `sort` bawaan untuk sorting, perhitungan naif O(n·k) untuk window, `JSON.stringify` untuk penelusuran objek |

Oracle hanya dipakai di dalam test, tidak di dalam implementasi.

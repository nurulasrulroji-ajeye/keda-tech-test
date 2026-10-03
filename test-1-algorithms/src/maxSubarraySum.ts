/**
 *
 * Algoritma: sliding window satu putaran. Setiap elemen masuk ke window tepat
 * sekali dan keluar tepat sekali, sehingga jumlah window berikutnya didapat dari
 * jumlah sebelumnya tanpa menjumlah ulang k elemen.
 *
 * - Waktu O(n), ruang O(1). Pendekatan "hitung ulang tiap window" O(n·k).
 * - Nilai awal `best` adalah -Infinity (bukan 0), jadi array yang semuanya
 *   negatif tetap menghasilkan jawaban yang benar.
 * - Untuk bilangan desimal, hasil bisa memiliki galat pembulatan floating point
 *   (menambah dan mengurangi secara bergantian); untuk bilangan bulat selalu eksak.
 */
export function maxSubarraySum(numbers: number[], k: number): number | null {
  const n = numbers.length;
  if (!Number.isInteger(k) || k < 1 || k > n) return null;

  let windowSum = 0;
  let best = -Infinity;

  for (let i = 0; i < n; i++) {
    windowSum += numbers[i]; // elemen baru masuk window
    if (i >= k) windowSum -= numbers[i - k]; // elemen lama keluar window
    if (i >= k - 1 && windowSum > best) best = windowSum; // window sudah penuh
  }

  return best;
}

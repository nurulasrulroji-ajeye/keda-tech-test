/**

 * Algoritma: bottom-up merge sort. Array dianggap kumpulan run sepanjang 1,
 * lalu run bersebelahan digabung berulang dengan lebar 1, 2, 4, 8, ...
 * Iteratif, jadi tidak ada risiko stack overflow.
 *
 * - Stabil: pada nilai yang sama, urutan asli dipertahankan (`>=` mendahulukan kiri).
 * - Tidak mengubah array asli; hasilnya selalu array baru.
 * - Waktu O(n log n) pada semua kasus, ruang O(n).
 * - Input diasumsikan bukan NaN (perbandingan dengan NaN tidak terdefinisi).
 */
export function sortDescending(numbers: number[]): number[] {
  const n = numbers.length;

  // Dua buffer salinan dipakai bergantian (ping-pong): tiap putaran membaca dari
  // `source` dan menulis hasil gabungan ke `target`, lalu keduanya ditukar.
  let source: number[] = [];
  let target: number[] = [];
  for (let i = 0; i < n; i++) {
    source[i] = numbers[i];
    target[i] = numbers[i];
  }

  for (let width = 1; width < n; width *= 2) {
    for (let start = 0; start < n; start += 2 * width) {
      const mid = start + width < n ? start + width : n;
      const end = start + 2 * width < n ? start + 2 * width : n;

      let left = start;
      let right = mid;
      let out = start;

      while (left < mid && right < end) {
        if (source[left] >= source[right]) {
          target[out++] = source[left++];
        } else {
          target[out++] = source[right++];
        }
      }
      while (left < mid) target[out++] = source[left++];
      while (right < end) target[out++] = source[right++];
    }

    const merged = target;
    target = source;
    source = merged;
  }

  return source;
}

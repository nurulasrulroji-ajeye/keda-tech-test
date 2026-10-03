import { describe, expect, it } from "vitest";
import * as fc from "fast-check";
import { maxSubarraySum } from "./maxSubarraySum";

// oracle: hitung ulang tiap window secara naif, O(n·k)
const bruteForce = (numbers: number[], k: number) => {
  let best = -Infinity;
  for (let start = 0; start + k <= numbers.length; start++) {
    let sum = 0;
    for (let i = start; i < start + k; i++) sum += numbers[i];
    if (sum > best) best = sum;
  }
  return best;
};

describe("maxSubarraySum", () => {
  it.each<[number[], number, number]>([
    [[100, 200, 300, 400], 2, 700],
    [[1, 4, 2, 10, 23, 3, 1, 0, 20], 4, 39],
    [[-3, 4, 0, -2, 6, -1], 2, 5],
  ])("contoh dari soal: (%j, %i) = %i", (numbers, k, expected) => {
    expect(maxSubarraySum(numbers, k)).toBe(expected);
  });

  it("k sama dengan panjang array menjumlahkan semuanya", () => {
    expect(maxSubarraySum([1, 2, 3], 3)).toBe(6);
  });

  it("k = 1 mengembalikan elemen terbesar", () => {
    expect(maxSubarraySum([4, 9, 2], 1)).toBe(9);
  });

  it("window terbaik berada di awal atau di akhir array", () => {
    expect(maxSubarraySum([9, 8, 1, 1, 1], 2)).toBe(17);
    expect(maxSubarraySum([1, 1, 1, 8, 9], 2)).toBe(17);
  });

  it("semua negatif: hasil tidak boleh 0", () => {
    expect(maxSubarraySum([-5, -2, -9], 1)).toBe(-2);
    expect(maxSubarraySum([-3, -1, -2], 2)).toBe(-3);
  });

  it.each<[string, number[], number]>([
    ["k lebih besar dari panjang array", [1, 2], 3],
    ["k = 0", [1, 2, 3], 0],
    ["k negatif", [1, 2, 3], -1],
    ["k bukan bilangan bulat", [1, 2, 3], 1.5],
    ["k NaN", [1, 2, 3], NaN],
    ["array kosong", [], 1],
  ])("mengembalikan null: %s", (_label, numbers, k) => {
    expect(maxSubarraySum(numbers, k)).toBeNull();
  });

  it("tidak mengubah array asli", () => {
    const input = [1, 2, 3, 4];
    maxSubarraySum(input, 2);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it("property: sama dengan perhitungan naif untuk semua k yang valid", () => {
    const arrayWithK = fc
      .array(fc.integer({ min: -1000, max: 1000 }), { minLength: 1, maxLength: 60 })
      .chain((numbers) =>
        fc.tuple(fc.constant(numbers), fc.integer({ min: 1, max: numbers.length })),
      );

    fc.assert(
      fc.property(arrayWithK, ([numbers, k]) => {
        expect(maxSubarraySum(numbers, k)).toBe(bruteForce(numbers, k));
      }),
    );
  });
});

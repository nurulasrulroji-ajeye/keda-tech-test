import { describe, expect, it, vi } from "vitest";
import * as fc from "fast-check";
import { sortDescending } from "./sortDescending";

const reference = (numbers: number[]) => [...numbers].sort((a, b) => b - a);

describe("sortDescending", () => {
  it("contoh dari soal", () => {
    expect(sortDescending([1, 2, 4, 3, 5, 3, 2, 1])).toEqual([5, 4, 3, 3, 2, 2, 1, 1]);
  });

  it("array yang sudah terurut turun tidak berubah", () => {
    expect(sortDescending([5, 4, 3, 2, 1])).toEqual([5, 4, 3, 2, 1]);
  });

  it("array terurut naik dibalik", () => {
    expect(sortDescending([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
  });

  it("angka negatif dan desimal", () => {
    expect(sortDescending([-1, 3.5, 0, -10, 2.25])).toEqual([3.5, 2.25, 0, -1, -10]);
  });

  it("semua elemen sama", () => {
    expect(sortDescending([7, 7, 7])).toEqual([7, 7, 7]);
  });

  it("array kosong dan satu elemen", () => {
    expect(sortDescending([])).toEqual([]);
    expect(sortDescending([42])).toEqual([42]);
  });

  it("panjang bukan pangkat dua (sisa run ikut tergabung)", () => {
    expect(sortDescending([3, 9, 1, 7, 5])).toEqual([9, 7, 5, 3, 1]);
    expect(sortDescending([2, 8, 4, 6, 1, 9, 3])).toEqual([9, 8, 6, 4, 3, 2, 1]);
  });

  it("tidak mengubah array asli dan mengembalikan array baru", () => {
    const input = [3, 1, 2];
    const result = sortDescending(input);

    expect(input).toEqual([3, 1, 2]);
    expect(result).not.toBe(input);
  });

  it("array satu elemen tetap mengembalikan salinan", () => {
    const input = [1];
    expect(sortDescending(input)).not.toBe(input);
  });

  it("tidak memakai Array.prototype.sort", () => {
    const spy = vi.spyOn(Array.prototype, "sort");
    sortDescending([3, 1, 2, 5, 4]);
    const calls = spy.mock.calls.length;
    spy.mockRestore();

    expect(calls).toBe(0);
  });

  it("menangani input besar (50.000 elemen)", () => {
    // generator pseudo-acak deterministik (LCG) agar test tidak flaky
    const big: number[] = [];
    let seed = 123456789;
    for (let i = 0; i < 50_000; i++) {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      big[i] = seed % 1000;
    }

    expect(sortDescending(big)).toEqual(reference(big));
  });

  it("property: sama dengan sort bawaan dan tidak mengubah input", () => {
    fc.assert(
      fc.property(
        // rentang sempit supaya banyak duplikat
        fc.array(fc.integer({ min: -50, max: 50 }), { maxLength: 200 }),
        (input) => {
          const snapshot = [...input];
          const result = sortDescending(input);

          expect(input).toEqual(snapshot);
          expect(result).toEqual(reference(input));
        },
      ),
    );
  });
});

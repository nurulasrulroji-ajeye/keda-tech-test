import { describe, expect, it } from "vitest";
import * as fc from "fast-check";
import { sumEvenNumbers } from "./sumEvenNumbers";

// oracle independen: JSON.stringify mengunjungi setiap nilai lewat mekanisme berbeda
const referenceSum = (value: unknown): number => {
  let total = 0;
  JSON.stringify(value, (_key, v) => {
    if (typeof v === "number" && Number.isInteger(v) && v % 2 === 0) total += v;
    return v;
  });
  return total;
};

describe("sumEvenNumbers", () => {
  it("contoh 1 dari soal", () => {
    const input = {
      outer: 2,
      obj: {
        inner: 2,
        otherObj: {
          superInner: 2,
          notANumber: true,
          alsoNotANumber: "yup",
        },
      },
    };
    expect(sumEvenNumbers(input)).toBe(6);
  });

  it("contoh 2 dari soal", () => {
    const input = {
      a: 2,
      b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
      c: { c: { c: 2 }, cc: "ball", ccc: 5 },
      d: 1,
      e: { e: { e: 4 }, ee: "car" },
    };
    expect(sumEvenNumbers(input)).toBe(12);
  });

  it("mengabaikan angka ganjil dan nilai non-angka", () => {
    expect(sumEvenNumbers({ a: 1, b: "dua", c: true, d: null, e: undefined, f: 3 })).toBe(0);
  });

  it("bilangan negatif genap dihitung, nol tidak berpengaruh", () => {
    expect(sumEvenNumbers({ a: -2, b: -3, c: { d: -4, e: 0 } })).toBe(-6);
  });

  it("mengabaikan desimal, NaN, dan Infinity", () => {
    expect(sumEvenNumbers({ a: 2.5, b: NaN, c: Infinity, d: 4 })).toBe(4);
  });

  it("menelusuri array di dalam objek", () => {
    expect(sumEvenNumbers({ list: [2, 3, { x: 4 }] })).toBe(6);
  });

  it("objek kosong dan input non-objek", () => {
    expect(sumEvenNumbers({})).toBe(0);
    expect(sumEvenNumbers(null)).toBe(0);
    expect(sumEvenNumbers("2")).toBe(0);
  });

  it("tidak loop tak berujung pada referensi melingkar", () => {
    const node: Record<string, unknown> = { value: 2 };
    node.self = node;
    expect(sumEvenNumbers(node)).toBe(2);
  });

  it("objek yang dipakai di dua tempat dihitung di tiap tempat", () => {
    const shared = { v: 2 };
    expect(sumEvenNumbers({ a: shared, b: shared })).toBe(4);
  });

  it("aman untuk nesting sangat dalam (tanpa stack overflow)", () => {
    let node: Record<string, unknown> = { value: 2 };
    for (let i = 0; i < 100_000; i++) node = { child: node };

    expect(sumEvenNumbers(node)).toBe(2);
  });

  it("property: sama dengan oracle berbasis JSON.stringify", () => {
    fc.assert(
      fc.property(fc.jsonValue(), (value) => {
        expect(sumEvenNumbers(value)).toBe(referenceSum(value));
      }),
    );
  });
});

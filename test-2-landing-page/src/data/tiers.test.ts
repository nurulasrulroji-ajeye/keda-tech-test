import { getMonthlyEquivalent, getPrice } from "./tiers";

describe("getPrice", () => {
  it("bulanan memakai harga dasar", () => {
    expect(getPrice(99000, "monthly")).toBe(99000);
  });

  it("tahunan membayar 10 bulan", () => {
    expect(getPrice(99000, "yearly")).toBe(990000);
  });
});

describe("getMonthlyEquivalent", () => {
  it("menghitung setara per bulan dari harga tahunan", () => {
    expect(getMonthlyEquivalent(99000)).toBe(82500);
    expect(getMonthlyEquivalent(499000)).toBe(415833);
  });
});

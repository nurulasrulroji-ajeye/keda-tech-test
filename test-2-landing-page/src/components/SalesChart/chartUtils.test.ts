import { formatJuta, getNiceScale } from "./chartUtils";

describe("getNiceScale", () => {
  it("membulatkan data harian", () => {
    expect(getNiceScale(9.2)).toEqual({ step: 3, max: 12, ticks: [0, 3, 6, 9, 12] });
  });

  it("membulatkan data bulanan", () => {
    const { step, max } = getNiceScale(236);
    expect(step).toBe(60);
    expect(max).toBe(240);
  });
});

describe("formatJuta", () => {
  it("memakai koma desimal Indonesia", () => {
    expect(formatJuta(9.2)).toBe("Rp 9,2 jt");
  });
});

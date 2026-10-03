const nf = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });

export const formatJuta = (value: number) => `Rp ${nf.format(value)} jt`;

/** Membulatkan sumbu Y ke angka "rapi" (3, 6, 9, 12 ...). */
export function getNiceScale(maxValue: number, tickCount = 4) {
  const rawStep = maxValue / tickCount;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = Math.ceil(rawStep / magnitude) * magnitude;

  return {
    step,
    max: step * tickCount,
    ticks: Array.from({ length: tickCount + 1 }, (_, i) => step * i),
  };
}

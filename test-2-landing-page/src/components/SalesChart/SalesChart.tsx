import { useState, type CSSProperties } from "react";
import { useInView } from "../../hooks/useInView";
import { rangeLabels, salesData, type Range } from "../../data/sales";
import { formatJuta, getNiceScale } from "./chartUtils";
import "./SalesChart.scss";

const W = 520;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 32, left: 40 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const BASELINE = PAD.top + PLOT_H;

const ranges = Object.keys(rangeLabels) as Range[];

export default function SalesChart() {
  const [range, setRange] = useState<Range>("week");
  const [active, setActive] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  const data = salesData[range];
  const scale = getNiceScale(Math.max(...data.map((d) => d.revenue)));
  const band = PLOT_W / data.length;
  const barWidth = Math.min(band * 0.5, 36);

  const x = (i: number) => PAD.left + band * i + band / 2;
  const y = (value: number) => BASELINE - (value / scale.max) * PLOT_H;

  // kurva halus antar titik
  const linePath = data
    .map((d, i) => {
      if (i === 0) return `M${x(i)} ${y(d.profit)}`;
      const cx = (x(i - 1) + x(i)) / 2;
      return `C${cx} ${y(data[i - 1].profit)} ${cx} ${y(d.profit)} ${x(i)} ${y(d.profit)}`;
    })
    .join(" ");

  const shown =
    active === null
      ? {
          revenue: data.reduce((sum, d) => sum + d.revenue, 0),
          profit: data.reduce((sum, d) => sum + d.profit, 0),
        }
      : data[active];

  const changeRange = (next: Range) => {
    setRange(next);
    setActive(null);
  };

  return (
    <div ref={ref} className="chart">
      <div className="chart__head">
        <div className="chart__readout">
          <p className="chart__period">
            {active === null ? `Total ${rangeLabels[range]}` : data[active].label}
          </p>
          <div className="chart__stats">
            <div>
              <span>
                <i className="chart__dot chart__dot--revenue" />
                Omzet
              </span>
              <strong>{formatJuta(shown.revenue)}</strong>
            </div>
            <div>
              <span>
                <i className="chart__dot chart__dot--profit" />
                Untung
              </span>
              <strong>{formatJuta(shown.profit)}</strong>
            </div>
          </div>
        </div>

        <div className="chart__tabs" role="group" aria-label="Rentang waktu">
          {ranges.map((r) => (
            <button key={r} type="button" aria-pressed={range === r} onClick={() => changeRange(r)}>
              {rangeLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <svg
        className={`chart__svg${active !== null ? " has-active" : ""}`}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Grafik omzet dan untung ${rangeLabels[range]} (contoh data)`}
        onPointerLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id="chart-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c39ae0" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
        </defs>

        <g className="chart__grid">
          {scale.ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end">
                {t}
              </text>
            </g>
          ))}
        </g>

        <g className="chart__labels">
          {data.map((d, i) => (
            <text key={d.label} x={x(i)} y={H - 10} textAnchor="middle">
              {d.label}
            </text>
          ))}
        </g>

        {/* dirender setelah terlihat; key = range supaya animasi diulang saat ganti rentang */}
        {inView && (
          <g key={range}>
            {data.map((d, i) => (
              <rect
                key={d.label}
                className={`chart__bar${active === i ? " is-active" : ""}`}
                style={{ "--i": i } as CSSProperties}
                x={x(i) - barWidth / 2}
                y={y(d.revenue)}
                width={barWidth}
                height={BASELINE - y(d.revenue)}
                rx={4}
              />
            ))}

            <path className="chart__line" d={linePath} pathLength={1} />

            {data.map((d, i) => (
              <circle
                key={d.label}
                className={`chart__point${active === i ? " is-active" : ""}`}
                style={{ "--i": i } as CSSProperties}
                cx={x(i)}
                cy={y(d.profit)}
                r={4.5}
              />
            ))}
          </g>
        )}

        {/* area hover per kolom */}
        {data.map((d, i) => (
          <rect
            key={d.label}
            className="chart__hit"
            x={PAD.left + band * i}
            y={PAD.top}
            width={band}
            height={PLOT_H}
            onPointerEnter={() => setActive(i)}
          />
        ))}
      </svg>

      <p className="chart__caption">Dalam juta rupiah · contoh data</p>
    </div>
  );
}

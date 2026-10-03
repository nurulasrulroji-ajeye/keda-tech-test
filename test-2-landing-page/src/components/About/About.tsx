import { FiPackage, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import type { IconType } from "react-icons";
import "./About.scss";
import Reveal from "../Reveal/Reveal";
import SalesChart from "../SalesChart/SalesChart";
import SectionDivider from "../SectionDivider/SectionDivider";

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FiPackage,
    title: "Stok Terpantau",
    description:
      "Catat setiap barang yang masuk dan keluar, sehingga stok selalu sesuai dengan kondisi di gudang.",
  },
  {
    icon: FiTrendingUp,
    title: "Untung Harian",
    description:
      "Lihat keuntungan yang didapat setiap hari tanpa perlu menghitung manual di akhir bulan.",
  },
  {
    icon: FiBarChart2,
    title: "Analisis Penjualan",
    description: "Grafik penjualan membantu menemukan produk terlaris dan waktu penjualan terbaik.",
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>Tentang Kami</h2>
            <p>
              Kami membangun aplikasi pencatatan yang sederhana untuk pengusaha, dari warung kecil
              sampai toko dengan banyak cabang.
            </p>
          </div>
        </Reveal>

        <div className="about__grid">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 120}>
              <article className="about__card">
                <span className="about__icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="about__preview">
          <Reveal direction="left">
            <div>
              <span className="about__tag">Tier Business ke atas</span>
              <h3>Lihat performa bisnis dalam sekali pandang</h3>
              <p>
                Grafik dibuat otomatis dari catatan stok dan penjualan harian. Bandingkan omzet dan
                untung per hari atau per bulan tanpa membuat laporan manual.
              </p>
              <a href="#pricing" className="about__link">
                Lihat paket →
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <SalesChart />
          </Reveal>
        </div>
      </div>
      <SectionDivider tone="white" flip />
    </section>
  );
}

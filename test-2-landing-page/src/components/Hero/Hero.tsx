import heroIllustration from "../../assets/svg/hero-analyst.svg";
import HeroBlob from "./HeroBlob";
import "./Hero.scss";
import SectionDivider from "../SectionDivider/SectionDivider";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__intro">
        <h1 className="hero__title">
          Catat stok, pantau untung, <span>tanpa ribet.</span>
        </h1>
        <p className="hero__lead">
          Catat barang masuk dan keluar, pantau keuntungan harian, dan ambil keputusan bisnis lebih
          cepat dalam satu dashboard.
        </p>
      </div>

      <div className="hero__left">
        <blockquote className="hero__quote">
          “Bisnis yang rapi dimulai dari pencatatan yang benar.”
        </blockquote>
        <img
          className="hero__illustration"
          src={heroIllustration}
          alt="Ilustrasi dashboard analisis penjualan"
        />
      </div>

      <HeroBlob />
      <SectionDivider tone="soft" />
    </section>
  );
}

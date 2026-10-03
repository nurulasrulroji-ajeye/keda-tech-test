import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import Reveal from "../Reveal/Reveal";
import {
  getMonthlyEquivalent,
  getPrice,
  tiers,
  YEARLY_MONTHS_PAID,
  type Billing,
} from "../../data/tiers";
import "./Pricing.scss";
import SectionDivider from "../SectionDivider/SectionDivider";
import Button from "../ui/Button/Button";

const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const options: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Bulanan" },
  { value: "yearly", label: "Tahunan" },
];

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const isYearly = billing === "yearly";

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>Pilih Paket</h2>
            <p>Mulai dari paket dasar, naik kelas kapan saja sesuai kebutuhan bisnis kamu.</p>
          </div>

          <div className="pricing__billing">
            <div
              className="pricing__toggle"
              role="group"
              aria-label="Periode tagihan"
              data-billing={billing}
            >
              {options.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={billing === value}
                  onClick={() => setBilling(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className={`pricing__save${isYearly ? " is-active" : ""}`}>
              Hemat {12 - YEARLY_MONTHS_PAID} bulan
            </span>
          </div>
        </Reveal>

        <div className="pricing__grid">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 150}>
              <article className={`pricing__card${tier.featured ? " is-featured" : ""}`}>
                {tier.featured && <span className="pricing__badge">Paling Populer</span>}
                <p className="pricing__level">{tier.level}</p>
                <h3>{tier.name}</h3>

                <p key={billing} className="pricing__price">
                  {formatIDR(getPrice(tier.price, billing))}
                  <small>{isYearly ? "/tahun" : "/bulan"}</small>
                </p>
                <p className="pricing__note">
                  {isYearly ? `Setara ${formatIDR(getMonthlyEquivalent(tier.price))}/bulan` : ""}
                </p>

                <ul>
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <FiCheck aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  as="a"
                  href="#contact"
                  variant={tier.featured ? "light" : "outline"}
                  fullWidth
                >
                  Pilih {tier.name}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <SectionDivider tone="soft" />
    </section>
  );
}

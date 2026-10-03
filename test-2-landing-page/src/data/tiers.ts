export interface Tier {
  name: string;
  level: string;
  price: number;
  features: string[];
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    name: "Basic",
    level: "TIER 1",
    price: 99000,
    features: ["Catat barang masuk", "Catat barang keluar", "Catat hasil keuntungan"],
  },
  {
    name: "Business",
    level: "TIER 2",
    price: 249000,
    featured: true,
    features: ["Semua fitur Basic", "Analisis penjualan dengan chart", "Support 24/7"],
  },
  {
    name: "Entrepreneur",
    level: "TIER 3",
    price: 499000,
    features: ["Semua fitur Business", "Export data ke Excel", "AI prediksi penghasilan"],
  },
];

export type Billing = "monthly" | "yearly";

export const YEARLY_MONTHS_PAID = 10;

export const getPrice = (monthly: number, billing: Billing) =>
  billing === "yearly" ? monthly * YEARLY_MONTHS_PAID : monthly;

export const getMonthlyEquivalent = (monthly: number) =>
  Math.round((monthly * YEARLY_MONTHS_PAID) / 12);

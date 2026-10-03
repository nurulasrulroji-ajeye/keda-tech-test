import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pricing from "./Pricing";
import { tiers } from "../../data/tiers";

describe("Pricing", () => {
  it("menampilkan 3 tier", () => {
    render(<Pricing />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    tiers.forEach(({ name }) => expect(screen.getByRole("heading", { name })).toBeInTheDocument());
  });

  it("menandai Business sebagai paling populer", () => {
    render(<Pricing />);
    const business = screen.getByRole("heading", { name: "Business" }).closest("article")!;
    expect(within(business).getByText("Paling Populer")).toBeInTheDocument();
  });

  it("tier Entrepreneur punya fitur Excel dan AI", () => {
    render(<Pricing />);
    expect(screen.getByText("Export data ke Excel")).toBeInTheDocument();
    expect(screen.getByText("AI prediksi penghasilan")).toBeInTheDocument();
  });

  it("default bulanan dengan format rupiah", () => {
    render(<Pricing />);
    expect(screen.getByRole("button", { name: "Bulanan" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/^Rp\s99\.000$/)).toBeInTheDocument();
    expect(screen.getByText(/^Rp\s249\.000$/)).toBeInTheDocument();
    expect(screen.getByText(/^Rp\s499\.000$/)).toBeInTheDocument();
    expect(screen.getAllByText("/bulan")).toHaveLength(3);
  });

  it("beralih ke tahunan: harga 10 bulan dan setara per bulan", async () => {
    render(<Pricing />);
    await userEvent.click(screen.getByRole("button", { name: "Tahunan" }));

    expect(screen.getByRole("button", { name: "Tahunan" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/^Rp\s990\.000$/)).toBeInTheDocument();
    expect(screen.getByText(/^Rp\s2\.490\.000$/)).toBeInTheDocument();
    expect(screen.getByText(/^Rp\s4\.990\.000$/)).toBeInTheDocument();
    expect(screen.getAllByText("/tahun")).toHaveLength(3);
    expect(screen.getByText("Setara Rp 82.500/bulan")).toBeInTheDocument();
  });

  it("kembali ke bulanan", async () => {
    render(<Pricing />);
    await userEvent.click(screen.getByRole("button", { name: "Tahunan" }));
    await userEvent.click(screen.getByRole("button", { name: "Bulanan" }));
    expect(screen.getByText(/^Rp\s99\.000$/)).toBeInTheDocument();
    expect(screen.queryByText(/Setara/)).not.toBeInTheDocument();
  });
});

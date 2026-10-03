import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("menampilkan 3 fitur utama", () => {
    render(<About />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    ["Stok Terpantau", "Untung Harian", "Analisis Penjualan"].forEach((name) =>
      expect(screen.getByRole("heading", { name })).toBeInTheDocument(),
    );
  });

  it('punya id "about" sebagai target anchor navbar', () => {
    const { container } = render(<About />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });
});

it("menampilkan preview grafik penjualan", () => {
  render(<About />);
  expect(screen.getByRole("img", { name: /grafik omzet dan untung/i })).toBeInTheDocument();
});

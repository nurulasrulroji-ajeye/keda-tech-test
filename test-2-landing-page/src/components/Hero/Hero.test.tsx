import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("menampilkan teks pengantar dan quote", () => {
    render(<Hero />);
    expect(screen.getByText(/Catat barang masuk dan keluar/)).toBeInTheDocument();
    expect(screen.getByText(/pencatatan yang benar/)).toBeInTheDocument();
  });

  it("ilustrasi punya alt text", () => {
    render(<Hero />);
    expect(screen.getByRole("img", { name: /dashboard analisis penjualan/i })).toBeInTheDocument();
  });

  it("punya satu heading utama (h1)", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/tanpa ribet/i);
  });
});

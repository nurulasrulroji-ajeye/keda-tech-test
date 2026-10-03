import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("menghubungkan label dengan input", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("menampilkan error: aria-invalid dan aria-describedby", () => {
    render(<Input label="Email" error="Email wajib diisi" />);
    const input = screen.getByLabelText("Email");
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("Email wajib diisi");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
  });

  it("menampilkan hint jika tidak ada error", () => {
    render(<Input label="Nama" hint="Nama lengkap" />);
    expect(screen.getByText("Nama lengkap")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

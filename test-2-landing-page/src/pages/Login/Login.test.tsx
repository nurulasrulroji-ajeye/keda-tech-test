import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";

const setup = () =>
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/" element={<p>Halaman Home</p>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Login", () => {
  it("menampilkan error dan tetap di halaman login saat submit kosong", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Masuk" }));
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.queryByText("Halaman Home")).not.toBeInTheDocument();
  });

  it("pindah ke home jika input valid", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Email"), "oji@mail.com");
    await userEvent.type(screen.getByLabelText("Password"), "rahasia1");
    await userEvent.click(screen.getByRole("button", { name: "Masuk" }));
    expect(screen.getByText("Halaman Home")).toBeInTheDocument();
  });

  it("toggle tampilkan/sembunyikan password", async () => {
    setup();
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(screen.getByRole("button", { name: "Tampilkan password" }));
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(screen.getByRole("button", { name: "Sembunyikan password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("link kembali mengarah ke beranda", () => {
    setup();
    expect(screen.getByRole("link", { name: /kembali ke beranda/i })).toHaveAttribute("href", "/");
  });
});

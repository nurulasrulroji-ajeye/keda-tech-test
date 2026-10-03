import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

const setup = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar", () => {
  it("menampilkan link ke setiap section", () => {
    setup();
    expect(screen.getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "PRICING" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "#contact");
  });

  it("LOGIN mengarah ke halaman /login", () => {
    setup();
    expect(screen.getByRole("link", { name: "LOGIN" })).toHaveAttribute("href", "/login");
  });

  it("toggle menu mobile", async () => {
    setup();
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

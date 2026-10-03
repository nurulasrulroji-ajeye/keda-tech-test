import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it('default: <button type="button">', () => {
    render(<Button>Klik</Button>);
    expect(screen.getByRole("button", { name: "Klik" })).toHaveAttribute("type", "button");
  });

  it("type bisa di-override", () => {
    render(<Button type="submit">Kirim</Button>);
    expect(screen.getByRole("button", { name: "Kirim" })).toHaveAttribute("type", "submit");
  });

  it('as="a" merender link', () => {
    render(
      <Button as="a" href="#contact">
        Ke kontak
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Ke kontak" })).toHaveAttribute("href", "#contact");
  });

  it("loading: disabled, aria-busy, dan onClick tidak dipanggil", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Simpan
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Simpan" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("memakai class variant dan size", () => {
    render(
      <Button variant="outline" size="sm" fullWidth className="custom">
        X
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass(
      "btn--outline",
      "btn--sm",
      "btn--full",
      "custom",
    );
  });
});

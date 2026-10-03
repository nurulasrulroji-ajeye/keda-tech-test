import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

const fillForm = async () => {
  await userEvent.type(screen.getByLabelText("Nama"), "Oji");
  await userEvent.type(screen.getByLabelText("Email"), "oji@mail.com");
  await userEvent.type(screen.getByLabelText("Pesan"), "Halo, ini pesan uji");
};

describe("Contact", () => {
  it("menampilkan error dan fokus ke field pertama saat submit kosong", async () => {
    render(<Contact />);
    await userEvent.click(screen.getByRole("button", { name: "Kirim Pesan" }));

    expect(screen.getAllByRole("alert")).toHaveLength(3);
    expect(screen.getByLabelText("Nama")).toHaveFocus();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("memvalidasi saat field ditinggalkan (blur)", async () => {
    render(<Contact />);
    await userEvent.type(screen.getByLabelText("Email"), "oji@");
    await userEvent.tab();
    expect(screen.getByRole("alert")).toHaveTextContent("Format email tidak valid");
  });

  it("menghitung karakter pesan", async () => {
    render(<Contact />);
    expect(screen.getByText("0/500")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Pesan"), "Halo");
    expect(screen.getByText("4/500")).toBeInTheDocument();
  });

  it("mengirim pesan, menampilkan sukses, lalu bisa kirim lagi", async () => {
    render(<Contact />);
    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: "Kirim Pesan" }));

    expect(screen.getByRole("button", { name: "Mengirim..." })).toBeDisabled();

    const status = await screen.findByRole("status", {}, { timeout: 3000 });
    expect(status).toHaveTextContent(/terkirim/i);
    expect(status).toHaveTextContent("oji@mail.com");

    await userEvent.click(screen.getByRole("button", { name: "Kirim pesan lain" }));
    expect(screen.getByLabelText("Nama")).toHaveValue("");
  });

  it("info kontak berupa link yang bisa diklik", () => {
    render(<Contact />);

    expect(screen.getByRole("link", { name: /^Email/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:.+@.+/),
    );
    expect(screen.getByRole("link", { name: /^Telepon/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/^tel:\+?\d+$/),
    );
  });
});

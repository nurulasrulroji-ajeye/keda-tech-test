import { validate } from "./validate";

describe("validate", () => {
  it("menolak input kosong", () => {
    expect(validate({ name: "", email: "", message: "" })).toEqual({
      name: "Nama wajib diisi",
      email: "Email wajib diisi",
      message: "Pesan minimal 10 karakter",
    });
  });

  it("menolak format email salah", () => {
    const errors = validate({ name: "Oji", email: "oji@", message: "Halo, ini pesan uji" });
    expect(errors.email).toBe("Format email tidak valid");
  });

  it("lolos jika semua valid", () => {
    expect(
      validate({ name: "Oji", email: "oji@mail.com", message: "Halo, ini pesan uji" }),
    ).toEqual({});
  });
});

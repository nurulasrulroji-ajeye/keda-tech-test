import { validateLogin } from "./validateLogin";

describe("validateLogin", () => {
  it("menolak input kosong", () => {
    expect(validateLogin({ email: "", password: "" })).toEqual({
      email: "Email wajib diisi",
      password: "Password wajib diisi",
    });
  });

  it("menolak email tidak valid dan password pendek", () => {
    expect(validateLogin({ email: "oji@", password: "123" })).toEqual({
      email: "Format email tidak valid",
      password: "Password minimal 6 karakter",
    });
  });

  it("lolos jika valid", () => {
    expect(validateLogin({ email: "oji@mail.com", password: "rahasia1" })).toEqual({});
  });
});

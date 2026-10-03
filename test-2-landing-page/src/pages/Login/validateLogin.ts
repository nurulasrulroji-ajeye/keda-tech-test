export interface LoginValues {
  email: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export function validateLogin({ email, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!email.trim()) errors.email = "Email wajib diisi";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Format email tidak valid";
  if (!password) errors.password = "Password wajib diisi";
  else if (password.length < 6) errors.password = "Password minimal 6 karakter";
  return errors;
}

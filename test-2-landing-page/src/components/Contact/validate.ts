export interface FormValues {
  name: string;
  email: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const MESSAGE_MAX = 500;

export function validate({ name, email, message }: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Nama wajib diisi";
  if (!email.trim()) errors.email = "Email wajib diisi";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Format email tidak valid";
  if (message.trim().length < 10) errors.message = "Pesan minimal 10 karakter";
  return errors;
}

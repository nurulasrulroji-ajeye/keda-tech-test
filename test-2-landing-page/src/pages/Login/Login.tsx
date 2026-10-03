import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import illustration from "../../assets/svg/hero-analyst.svg";
import { validateLogin, type LoginErrors, type LoginValues } from "./validateLogin";
import "./Login.scss";

const initialValues: LoginValues = { email: "", password: "" };

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateLogin(values);
    setErrors(result);
    if (Object.keys(result).length > 0) return;

    navigate("/", { replace: true });
  };

  return (
    <div className="login">
      <aside className="login__side">
        <img src={illustration} alt="" />
        <p>Catat stok, pantau keuntungan, dan analisis penjualan dalam satu tempat.</p>
      </aside>

      <main className="login__main">
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <h1>Masuk</h1>
          <p>Masuk ke dashboard untuk mulai mencatat.</p>

          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            leftIcon={<FiMail />}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Minimal 6 karakter"
            leftIcon={<FiLock />}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <label className="login__remember" htmlFor="login-remember">
            <input id="login-remember" type="checkbox" />
            Ingat saya
          </label>

          <Button type="submit" size="lg" fullWidth>
            Masuk
          </Button>
        </form>
      </main>
    </div>
  );
}

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input, { type InputProps } from "../Input/Input";

type PasswordInputProps = Omit<InputProps, "type" | "rightSlot">;

export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          className="field__toggle"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      }
    />
  );
}

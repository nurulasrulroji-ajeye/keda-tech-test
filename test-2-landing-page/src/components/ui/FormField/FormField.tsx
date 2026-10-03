import type { ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";
import "./FormField.scss";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  counter?: ReactNode;
  children: ReactNode;
}

export default function FormField({ id, label, error, hint, counter, children }: FormFieldProps) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <div className="field__meta">
        {error ? (
          <span id={`${id}-error`} role="alert" className="field__error">
            <FiAlertCircle aria-hidden="true" />
            {error}
          </span>
        ) : (
          <span id={`${id}-hint`} className="field__hint">
            {hint}
          </span>
        )}
        {counter}
      </div>
    </div>
  );
}

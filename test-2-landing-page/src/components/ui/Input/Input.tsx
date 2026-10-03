import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import FormField from "../FormField/FormField";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightSlot,
  id,
  className,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <FormField id={inputId} label={label} error={error} hint={hint}>
      <div
        className={`field__control${leftIcon ? " has-left" : ""}${rightSlot ? " has-right" : ""}`}
      >
        {leftIcon && (
          <span className="field__icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={`field__input${className ? ` ${className}` : ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {rightSlot && <span className="field__slot">{rightSlot}</span>}
      </div>
    </FormField>
  );
}

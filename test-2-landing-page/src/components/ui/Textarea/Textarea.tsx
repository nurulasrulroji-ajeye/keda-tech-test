import { useId, type TextareaHTMLAttributes } from "react";
import FormField from "../FormField/FormField";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function Textarea({ label, error, hint, id, className, ...rest }: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

  const { maxLength, value } = rest;
  const length = typeof value === "string" ? value.length : 0;
  const counter = maxLength ? (
    <span className={`field__counter${length >= maxLength * 0.9 ? " is-limit" : ""}`}>
      {length}/{maxLength}
    </span>
  ) : undefined;

  return (
    <FormField id={fieldId} label={label} error={error} hint={hint} counter={counter}>
      <div className="field__control">
        <textarea
          id={fieldId}
          className={`field__input${className ? ` ${className}` : ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
      </div>
    </FormField>
  );
}

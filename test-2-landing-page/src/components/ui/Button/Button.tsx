import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./Button.scss";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

interface OwnProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps<T extends ElementType = "button"> = OwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | "as">;

export default function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component: ElementType = as ?? "button";
  const isNative = Component === "button";
  const isDisabled = disabled || loading;

  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    loading && "is-loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      {...(isNative
        ? { type: "button", disabled: isDisabled }
        : { "aria-disabled": isDisabled || undefined })}
      {...rest}
      className={classes}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="btn__spinner" aria-hidden="true" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Component>
  );
}

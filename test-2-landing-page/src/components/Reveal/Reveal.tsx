import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import "./Reveal.scss";

interface RevealProps {
  children: ReactNode;
  delay?: number; // ms
  direction?: "up" | "left" | "right";
}

export default function Reveal({ children, delay = 0, direction = "up" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal reveal--${direction}${inView ? " is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

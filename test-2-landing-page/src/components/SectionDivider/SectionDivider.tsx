import "./SectionDivider.scss";

interface SectionDividerProps {
  tone: "white" | "soft" | "dark";
  flip?: boolean;
}

export default function SectionDivider({ tone, flip = false }: SectionDividerProps) {
  return (
    <svg
      className={`section-divider section-divider--${tone}${flip ? " is-flipped" : ""}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        opacity="0.45"
        d="M0,40 C240,8 480,8 720,48 C960,88 1200,96 1440,56 L1440,120 L0,120 Z"
      />
      <path
        fill="currentColor"
        d="M0,64 C240,112 480,112 720,72 C960,32 1200,24 1440,64 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

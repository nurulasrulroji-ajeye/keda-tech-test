import { render } from "@testing-library/react";
import SectionDivider from "./SectionDivider";

describe("SectionDivider", () => {
  it("dekoratif: disembunyikan dari screen reader", () => {
    const { container } = render(<SectionDivider tone="soft" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("section-divider--soft");
  });

  it("menambah class saat flip", () => {
    const { container } = render(<SectionDivider tone="white" flip />);
    expect(container.querySelector("svg")).toHaveClass("is-flipped");
  });
});

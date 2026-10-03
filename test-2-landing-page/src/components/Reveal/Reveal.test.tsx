import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

describe("Reveal", () => {
  it("menampilkan children dengan class arah", () => {
    render(
      <Reveal direction="left">
        <p>Halo</p>
      </Reveal>,
    );
    const wrapper = screen.getByText("Halo").parentElement!;
    expect(wrapper).toHaveClass("reveal", "reveal--left");
  });
});

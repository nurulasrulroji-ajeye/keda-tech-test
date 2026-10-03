import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SalesChart from "./SalesChart";

describe("SalesChart", () => {
  it("menampilkan total 7 hari secara default", () => {
    render(<SalesChart />);
    expect(screen.getByText("Total 7 Hari")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "7 Hari" })).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelectorAll(".chart__bar")).toHaveLength(7);
  });

  it("menampilkan data per titik saat di-hover", () => {
    const { container } = render(<SalesChart />);
    fireEvent.pointerEnter(container.querySelectorAll(".chart__hit")[5]);

    const readout = container.querySelector(".chart__readout");
    expect(readout).toHaveTextContent("Sab");
    expect(readout).toHaveTextContent("Rp 9,2 jt");
    expect(readout).toHaveTextContent("Rp 3,1 jt");
  });

  it("ganti ke 12 bulan", async () => {
    render(<SalesChart />);
    await userEvent.click(screen.getByRole("button", { name: "12 Bulan" }));
    expect(screen.getByText("Total 12 Bulan")).toBeInTheDocument();
    expect(document.querySelectorAll(".chart__bar")).toHaveLength(12);
  });
});

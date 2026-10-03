import { render, screen } from "@testing-library/react";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("menampilkan counter jika maxLength diberikan", () => {
    render(<Textarea label="Pesan" maxLength={10} value="abc" onChange={() => {}} />);
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });

  it("counter berubah merah mendekati batas", () => {
    render(<Textarea label="Pesan" maxLength={10} value="abcdefghi" onChange={() => {}} />);
    expect(screen.getByText("9/10")).toHaveClass("is-limit");
  });

  it("tanpa maxLength tidak ada counter", () => {
    render(<Textarea label="Pesan" value="abc" onChange={() => {}} />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });
});

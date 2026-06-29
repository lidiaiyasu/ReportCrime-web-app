import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders the main navigation links", () => {
    render(<Header active="home" />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /report crime/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /police portal/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("toggles the mobile nav open/closed via the hamburger button", async () => {
    const user = userEvent.setup();
    render(<Header active="home" />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close navigation menu/i })
    ).toHaveAttribute("aria-expanded", "true");
  });
});

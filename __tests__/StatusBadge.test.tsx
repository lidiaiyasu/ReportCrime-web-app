import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("renders human-readable labels for each status", () => {
    render(<StatusBadge status="pendingTrial" />);
    expect(screen.getByText("Pending Trial")).toBeInTheDocument();
  });

  it("applies a status-specific class for styling", () => {
    render(<StatusBadge status="open" />);
    expect(screen.getByText("Open")).toHaveClass("badge-open");
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgeGateModal } from "@/components/auth/AgeGateModal";

describe("AgeGateModal", () => {
  const onAdult = vi.fn();
  const onMinor = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-21"));
    onAdult.mockReset();
    onMinor.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the age verification form", () => {
    render(<AgeGateModal onAdult={onAdult} onMinor={onMinor} />);
    expect(screen.getByText("Verify your age")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  function getDateInput(container: HTMLElement) {
    return container.querySelector('input[type="date"]') as HTMLInputElement;
  }

  it("calls onAdult for users 18+", () => {
    const { container } = render(<AgeGateModal onAdult={onAdult} onMinor={onMinor} />);
    const input = getDateInput(container);
    fireEvent.change(input, { target: { value: "2000-01-15" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(onAdult).toHaveBeenCalled();
    expect(onMinor).not.toHaveBeenCalled();
  });

  it("calls onMinor for users under 18", () => {
    const { container } = render(<AgeGateModal onAdult={onAdult} onMinor={onMinor} />);
    const input = getDateInput(container);
    fireEvent.change(input, { target: { value: "2015-01-15" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(onMinor).toHaveBeenCalled();
    expect(onAdult).not.toHaveBeenCalled();
  });

  it("shows error for invalid date", () => {
    const { container } = render(<AgeGateModal onAdult={onAdult} onMinor={onMinor} />);
    const input = getDateInput(container);
    fireEvent.change(input, { target: { value: "not-a-date" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText("Enter a valid date")).toBeInTheDocument();
    expect(onAdult).not.toHaveBeenCalled();
    expect(onMinor).not.toHaveBeenCalled();
  });

  it("shows error for future date", () => {
    const { container } = render(<AgeGateModal onAdult={onAdult} onMinor={onMinor} />);
    const input = getDateInput(container);
    fireEvent.change(input, { target: { value: "2030-01-01" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(onAdult).not.toHaveBeenCalled();
    expect(onMinor).not.toHaveBeenCalled();
  });
});

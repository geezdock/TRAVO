import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmailStep } from "@/components/auth/EmailStep";

describe("EmailStep", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email input", () => {
    render(<EmailStep onNext={onNext} />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("calls onNext with valid email", () => {
    render(<EmailStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("you@example.com");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByText("Send OTP"));
    expect(onNext).toHaveBeenCalledWith("test@example.com");
  });

  it("shows error for invalid email", () => {
    render(<EmailStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("you@example.com");
    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(screen.getByText("Send OTP"));
    expect(onNext).not.toHaveBeenCalled();
  });

  it("shows error for empty submission", () => {
    render(<EmailStep onNext={onNext} />);
    fireEvent.click(screen.getByText("Send OTP"));
    expect(onNext).not.toHaveBeenCalled();
  });
});

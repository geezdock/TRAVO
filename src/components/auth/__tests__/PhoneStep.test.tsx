import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneStep } from "@/components/auth/PhoneStep";

describe("PhoneStep", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders phone input with +91 prefix", () => {
    render(<PhoneStep onNext={onNext} />);
    expect(screen.getByText("+91")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("98765 43210")).toBeInTheDocument();
  });

  it("calls onNext with valid 10-digit phone number", () => {
    render(<PhoneStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("98765 43210");
    fireEvent.change(input, { target: { value: "9876543210" } });
    fireEvent.click(screen.getByText("Send OTP"));
    expect(onNext).toHaveBeenCalledWith("9876543210");
  });

  it("shows error for invalid phone number", () => {
    render(<PhoneStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("98765 43210");
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(screen.getByText("Send OTP"));
    expect(screen.getByText("Enter a valid 10-digit Indian mobile number")).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("shows error for empty submission", () => {
    render(<PhoneStep onNext={onNext} />);
    fireEvent.click(screen.getByText("Send OTP"));
    expect(onNext).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { OTPStep } from "@/components/auth/OTPStep";

describe("OTPStep", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders label and sublabel", () => {
    render(<OTPStep label="+91 98765 43210" sublabel="Enter the code sent to" onNext={onNext} />);
    expect(screen.getByText("Enter the code sent to")).toBeInTheDocument();
    expect(screen.getByText("+91 98765 43210")).toBeInTheDocument();
  });

  it("renders 6 input boxes", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBe(6);
  });

  it("auto-focuses first input on mount", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    expect(document.activeElement).toBe(inputs[0]);
  });

  it("accepts single digit per input", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(inputs[0]).toHaveValue("1");
  });

  it("rejects non-digit input", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    fireEvent.change(inputs[0], { target: { value: "a" } });
    expect(inputs[0]).toHaveValue("");
  });

  it("auto-advances to next input on digit entry", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("auto-submits on 6 valid digits", () => {
    const { container } = render(<OTPStep label="" sublabel="" onNext={onNext} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    for (let i = 0; i < 6; i++) {
      fireEvent.change(inputs[i], { target: { value: String(i + 1) } });
    }
    expect(onNext).toHaveBeenCalled();
  });

  it("shows resend timer counting down", () => {
    render(<OTPStep label="" sublabel="" onNext={onNext} />);
    expect(screen.getByText(/Resend in/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(30000));
    expect(screen.getByText("Resend OTP")).toBeInTheDocument();
  });

  it("resend button clears OTP and resets timer", () => {
    render(<OTPStep label="" sublabel="" onNext={onNext} />);
    act(() => vi.advanceTimersByTime(30000));
    fireEvent.click(screen.getByText("Resend OTP"));
    expect(screen.getByText(/Resend in 30/)).toBeInTheDocument();
  });
});

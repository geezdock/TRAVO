import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConsentSent } from "@/components/auth/ConsentSent";

describe("ConsentSent", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Consent request sent" heading', () => {
    render(<ConsentSent contact={{ type: "phone", value: "9876543210" }} onNext={onNext} />);
    expect(screen.getByText("Consent request sent")).toBeInTheDocument();
  });

  it("displays phone contact formatted with +91", () => {
    render(<ConsentSent contact={{ type: "phone", value: "9876543210" }} onNext={onNext} />);
    expect(screen.getByText("+91 98765 43210")).toBeInTheDocument();
  });

  it("displays email contact directly", () => {
    render(<ConsentSent contact={{ type: "email", value: "parent@example.com" }} onNext={onNext} />);
    expect(screen.getByText("parent@example.com")).toBeInTheDocument();
  });

  it("calls onNext when Continue clicked", () => {
    render(<ConsentSent contact={{ type: "phone", value: "9876543210" }} onNext={onNext} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(onNext).toHaveBeenCalled();
  });
});

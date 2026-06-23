import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ParentContactForm } from "@/components/auth/ParentContactForm";

describe("ParentContactForm", () => {
  const onSent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with phone selected by default", () => {
    render(<ParentContactForm onSent={onSent} />);
    expect(screen.getByText("Parent's Phone Number")).toBeInTheDocument();
  });

  it("switches to email when Email tab clicked", () => {
    render(<ParentContactForm onSent={onSent} />);
    fireEvent.click(screen.getByText("Email"));
    expect(screen.getByText("Parent's Email Address")).toBeInTheDocument();
  });

  it("calls onSent with phone contact for valid phone", () => {
    render(<ParentContactForm onSent={onSent} />);
    const input = screen.getByPlaceholderText("98765 43210");
    fireEvent.change(input, { target: { value: "9876543210" } });
    fireEvent.click(screen.getByText("Send Consent Request"));
    expect(onSent).toHaveBeenCalledWith({ type: "phone", value: "9876543210" });
  });

  it("calls onSent with email contact when email mode and valid email", () => {
    render(<ParentContactForm onSent={onSent} />);
    fireEvent.click(screen.getByText("Email"));
    const input = screen.getByPlaceholderText("parent@example.com");
    fireEvent.change(input, { target: { value: "parent@example.com" } });
    fireEvent.click(screen.getByText("Send Consent Request"));
    expect(onSent).toHaveBeenCalledWith({ type: "email", value: "parent@example.com" });
  });

  it("shows error for invalid phone", () => {
    render(<ParentContactForm onSent={onSent} />);
    const input = screen.getByPlaceholderText("98765 43210");
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(screen.getByText("Send Consent Request"));
    expect(onSent).not.toHaveBeenCalled();
  });
});

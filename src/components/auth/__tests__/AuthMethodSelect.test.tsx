import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthMethodSelect } from "@/components/auth/AuthMethodSelect";

describe("AuthMethodSelect", () => {
  const onSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders "Get started" heading for get-started mode', () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="get-started" />);
    expect(screen.getByText("Get started")).toBeInTheDocument();
  });

  it('renders "Welcome back" heading for login mode', () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="login" />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("shows correct subtext for get-started mode", () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="get-started" />);
    expect(screen.getByText("Join your squad and start planning trips.")).toBeInTheDocument();
  });

  it("shows correct subtext for login mode", () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="login" />);
    expect(screen.getByText("Sign in to your account.")).toBeInTheDocument();
  });

  it("calls onSelect with google when Google button clicked", () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="get-started" />);
    fireEvent.click(screen.getByText("Continue with Google"));
    expect(onSelect).toHaveBeenCalledWith("google");
  });

  it("calls onSelect with phone when Phone button clicked", () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="get-started" />);
    fireEvent.click(screen.getByText("Phone"));
    expect(onSelect).toHaveBeenCalledWith("phone");
  });

  it("calls onSelect with email when Email button clicked", () => {
    render(<AuthMethodSelect onSelect={onSelect} mode="get-started" />);
    fireEvent.click(screen.getByText("Email"));
    expect(onSelect).toHaveBeenCalledWith("email");
  });
});

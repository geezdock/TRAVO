import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UsernameStep } from "@/components/auth/UsernameStep";

vi.mock("@/lib/schemas", () => ({
  usernameSchema: {
    safeParse: (val: string) => {
      if (typeof val !== "string" || val.length < 3)
        return { success: false, error: { issues: [{ message: "Username must be at least 3 characters" }] } };
      if (!/^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$/.test(val) && val.length > 2)
        return { success: false, error: { issues: [{ message: "Only letters, numbers, and underscores" }] } };
      return { success: true, data: val };
    },
  },
  isUsernameAvailable: vi.fn(),
}));

import { isUsernameAvailable } from "@/lib/schemas";

describe("UsernameStep", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (isUsernameAvailable as ReturnType<typeof vi.fn>).mockResolvedValue(true);
  });

  it("renders username input with @ prefix", () => {
    render(<UsernameStep onNext={onNext} />);
    expect(screen.getByText("Pick your username")).toBeInTheDocument();
    expect(screen.getByText("@")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("yourname")).toBeInTheDocument();
  });

  it("shows validation error for short username", async () => {
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "ab" } });
    await waitFor(() => {
      expect(screen.getByText("Username must be at least 3 characters")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("calls isUsernameAvailable after debounce for valid username", async () => {
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "validuser" } });
    await waitFor(() => {
      expect(isUsernameAvailable).toHaveBeenCalledWith("validuser");
    }, { timeout: 2000 });
  });

  it("shows available status and enables submit", async () => {
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "uniqueuser" } });
    await waitFor(() => {
      expect(screen.getByText(/is available/)).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(screen.getByText("Continue")).not.toBeDisabled();
  });

  it("calls onNext when submitted with available username", async () => {
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "uniqueuser" } });
    await waitFor(() => {
      expect(screen.getByText(/is available/)).toBeInTheDocument();
    }, { timeout: 2000 });
    fireEvent.click(screen.getByText("Continue"));
    expect(onNext).toHaveBeenCalledWith("uniqueuser");
  });

  it("disables submit when username is taken", async () => {
    (isUsernameAvailable as ReturnType<typeof vi.fn>).mockResolvedValue(false);
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "admin" } });
    await waitFor(() => {
      expect(screen.getByText("This username is taken")).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(screen.getByText("Continue")).toBeDisabled();
  });

  it("strips non-alphanumeric characters from input", () => {
    render(<UsernameStep onNext={onNext} />);
    const input = screen.getByPlaceholderText("yourname");
    fireEvent.change(input, { target: { value: "user-name!" } });
    expect(input).toHaveValue("username");
  });
});

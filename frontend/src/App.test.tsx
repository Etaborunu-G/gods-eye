import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("God's Eye application shell", () => {
  it("renders the application title", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "GOD'S EYE" })).toBeTruthy();
  });
});

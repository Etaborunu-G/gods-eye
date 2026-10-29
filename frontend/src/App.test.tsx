
import { describe, it, expect, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

// Ensure each test starts with a clean DOM.
afterEach(() => {
  cleanup();
});

describe("God's Eye Application", () => {
  it("renders the God's Eye title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "GOD'S EYE",
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("switches operational modes when clicked", () => {
    render(<App />);

    const desktopNav = screen.getByRole("navigation", {
      name: "Operational modes",
    });

    const exploreButton = within(desktopNav).getByRole("button", {
      name: "Explore",
    });

    const spaceButton = within(desktopNav).getByRole("button", {
      name: "Space",
    });

    expect(exploreButton).toHaveClass("mode-button-active");

    fireEvent.click(spaceButton);

    expect(spaceButton).toHaveClass("mode-button-active");
    expect(exploreButton).not.toHaveClass("mode-button-active");
  });

  it("opens and closes the Control Center", () => {
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open application menu",
    });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("CONTROL CENTER")).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("CONTROL CENTER")).not.toBeInTheDocument();
  });

  it("closes the Control Center when Escape is pressed", () => {
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open application menu",
    });

    fireEvent.click(menuButton);

    expect(screen.getByText("CONTROL CENTER")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByText("CONTROL CENTER")).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the Control Center when clicking outside", () => {
    render(<App />);

    const menuButton = screen.getByRole("button", {
      name: "Open application menu",
    });

    fireEvent.click(menuButton);

    expect(screen.getByText("CONTROL CENTER")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(screen.queryByText("CONTROL CENTER")).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("updates mobile telemetry when switching modes", () => {
    render(<App />);

    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile operational modes",
    });

    const telemetryPanel = screen.getByRole("complementary", {
      name: "Telemetry overview",
    });

    expect(
      within(telemetryPanel).getByText("Global situational overview")
    ).toBeInTheDocument();

    const flightsButton = within(mobileNav).getByRole("button", {
      name: "Flights",
    });

    fireEvent.click(flightsButton);

    expect(
      within(telemetryPanel).getByText("Aircraft tracking")
    ).toBeInTheDocument();

    expect(flightsButton).toHaveAttribute("aria-current", "page");
  });

  it("keeps desktop and mobile navigation synchronized", () => {
    render(<App />);

    const desktopNav = screen.getByRole("navigation", {
      name: "Operational modes",
    });

    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile operational modes",
    });

    fireEvent.click(
      within(mobileNav).getByRole("button", { name: "Marine" })
    );

    expect(
      within(desktopNav).getByRole("button", { name: "Marine" })
    ).toHaveClass("mode-button-active");

    expect(
      within(mobileNav).getByRole("button", { name: "Marine" })
    ).toHaveAttribute("aria-current", "page");
  });
});

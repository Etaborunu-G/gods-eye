import { useEffect, useRef, useState, type MouseEvent } from "react";
const modes = ["Explore", "Space", "Flights", "Marine"] as const;
const modeDescriptions = {
  Explore: "Global situational overview",
  Space: "Satellite telemetry",
  Flights: "Aircraft tracking",
  Marine: "Maritime vessel tracking",
} as const;

function App() {
  const [activeMode, setActiveMode] =
    useState<(typeof modes)[number]>("Explore");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const utcTime = currentTime.toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour12: false,
  });

  const utcDate = currentTime.toLocaleDateString("en-CA", {
    timeZone: "UTC",
  });

  const handleGlassPointer = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    button.style.setProperty("--pointer-x", `${x}px`);
    button.style.setProperty("--pointer-y", `${y}px`);
  };

  return (
    <main className="app-shell">
      <header className="topbar glass">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
          </div>

          <div className="brand-copy">
            <h1>GOD'S EYE</h1>
            <p>REAL-TIME SITUATIONAL AWARENESS</p>
          </div>
        </div>

        <nav className="mode-selector glass" aria-label="Operational modes">
          {modes.map((mode) => (
            <button
              className={`mode-button glass-interactive ${
                activeMode === mode ? "mode-button-active" : ""
              }`}
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              onMouseMove={handleGlassPointer}
            >
              {mode}
            </button>
          ))}
        </nav>

        <div className="topbar-actions" ref={menuRef}>
          <div className="system-status">
            <span className="status-dot" />
            <span>SYSTEM ONLINE</span>
          </div>

          <button
            className="menu-button glass-interactive"
            type="button"
            aria-label="Open application menu"
            aria-expanded={isMenuOpen}
            aria-controls="application-menu"
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
            <span />
            <span />
            <span />
            <span />
          </button>

          {isMenuOpen && (
            <div
              id="application-menu"
              className="application-menu glass"
              role="region"
              aria-label="Application controls"
            >
              <div className="menu-heading">
                <span>CONTROL CENTER</span>
                <span className="menu-version">v0.0.1</span>
              </div>

              <div className="menu-section">
                <span className="menu-section-label">SYSTEM</span>
                <p>God's Eye interface preview</p>
                <p>Live telemetry integration coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="globe-placeholder" aria-label="3D Earth viewport">
        <div className="earth-preview" aria-hidden="true">
          <div className="earth-glow" />
          <div className="earth-surface" />
        </div>

        <div className="hero-content">
          <p className="hero-kicker">GLOBAL PERSPECTIVE. A SAFER TOMORROW.</p>

          <h2>GOD'S EYE</h2>

          <p className="hero-subtitle">3D EARTH INTERFACE</p>

          <p className="hero-status">
            Earth visualization system initializing in M1.
          </p>
        </div>

        <div className="coordinate-hud glass">
          <div className="hud-value">
            <span>LAT</span>
            <strong>--.----°</strong>
          </div>

          <div className="hud-divider" />

          <div className="hud-value">
            <span>LON</span>
            <strong>---.----°</strong>
          </div>
        </div>

        <div className="time-hud glass">
          <div className="hud-value">
            <span>UTC</span>
            <strong>{utcTime}</strong>
          </div>

          <div className="hud-divider" />

          <div className="hud-value">
            <span>DATE</span>
            <strong>{utcDate}</strong>
          </div>
        </div>

        <div className="navigation-hint" aria-hidden="true">
          <div className="mouse-icon">
            <span />
          </div>

          <span>EXPLORE EARTH</span>
        </div>
      </section>

      {/* MOBILE TELEMETRY PANEL */}
      <aside
        className="mobile-telemetry-panel glass"
        aria-label="Telemetry overview"
      >
        <div className="telemetry-panel-header">
          <div>
            <span className="telemetry-panel-label">TELEMETRY</span>
            <h3>{activeMode.toUpperCase()}</h3>
          </div>

          <span className="telemetry-preview-status">PREVIEW</span>
        </div>

        <p className="telemetry-panel-description">
          {modeDescriptions[activeMode]}
        </p>

        <div className="telemetry-panel-footer">
          <span>DATA SOURCE</span>
          <strong>NOT CONNECTED</strong>
        </div>
      </aside>

      {/* MOBILE MODE NAVIGATION */}
      <nav
        className="mobile-mode-dock glass"
        aria-label="Mobile operational modes"
      >
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            className={`mobile-mode-button glass-interactive ${
              activeMode === mode ? "mobile-mode-button-active" : ""
            }`}
            aria-current={activeMode === mode ? "page" : undefined}
            onClick={() => setActiveMode(mode)}
          >
            <span>{mode}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}

export default App;

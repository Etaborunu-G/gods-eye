import { useEffect, useState, type MouseEvent } from "react";
const modes = ["Explore", "Space", "Flights", "Marine"] as const;

function App() {
  const [activeMode, setActiveMode] = useState<(typeof modes)[number]>("Explore");
  const [currentTime, setCurrentTime] = useState(() => new Date());

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

        <div className="system-status">
          <span className="status-dot" />
          <span>SYSTEM ONLINE</span>
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
      
    </main>
  );
}

export default App;

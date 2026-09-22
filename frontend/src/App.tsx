const modes = ["Explore", "Space", "Flights", "Marine"] as const;

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">REAL-TIME SITUATIONAL AWARENESS</p>
          <h1>GOD'S EYE</h1>
        </div>

        <nav aria-label="Operational modes">
          {modes.map((mode) => (
            <button key={mode} type="button">
              {mode}
            </button>
          ))}
        </nav>
      </header>

      <section className="globe-placeholder" aria-label="3D Earth viewport">
        <div>
          <p className="status">M0 · FRONTEND FOUNDATION</p>
          <h2>3D Earth</h2>
          <p>CesiumJS integration comes in the Earth MVP milestone.</p>
        </div>
      </section>
    </main>
  );
}

export default App;

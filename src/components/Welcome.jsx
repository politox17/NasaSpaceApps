import React, { useState } from "react";
import OrbitSetup from "./OrbiteSetup";
import MoonMarsSetup from "./MoonMarsSetup";
import "../styles/Welcome.css"; // importiamo il CSS

export default function Welcome() {
  const [selection, setSelection] = useState(null);

  const handleBack = () => setSelection(null);

  if (selection === "orbit") return <OrbitSetup onBack={handleBack} />;
  if (selection === "moon") return <MoonMarsSetup type="Moon" onBack={handleBack} />;
  if (selection === "mars") return <MoonMarsSetup type="Mars" onBack={handleBack} />;

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome!</h1>
      <p className="welcome-subtitle">Where do you want to create your home?</p>
      <div className="button-group">
        <button className="planet-btn orbit" onClick={() => setSelection("orbit")}>Orbit 🛰️</button>
        <button className="planet-btn moon" onClick={() => setSelection("moon")}>Moon 🌙</button>
        <button className="planet-btn mars" onClick={() => setSelection("mars")}>Mars ♂️</button>
      </div>
    </div>
  );
}

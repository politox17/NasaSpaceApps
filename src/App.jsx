import React, { useState } from "react";
import Welcome from "./components/Welcome.jsx";
import OrbitSetup from "./components/OrbiteSetup.jsx";
import MoonMarsSetup from "./components/MoonMarsSetup.jsx";

export default function App() {
  const [destination, setDestination] = useState(null);

  const handleSelect = (place) => setDestination(place);
  const handleBack = () => setDestination(null);

  return (
    <>
      {!destination && <Welcome onSelect={handleSelect} />}
      {destination === "orbit" && <OrbitSetup onBack={handleBack} />}
      {destination === "moon" && <MoonMarsSetup type="Moon" onBack={handleBack} />}
      {destination === "mars" && <MoonMarsSetup type="Mars" onBack={handleBack} />}
    </>
  );
}

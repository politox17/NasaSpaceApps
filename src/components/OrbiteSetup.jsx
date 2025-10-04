import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cylinder2DView from "./Cylinder2D.jsx";

function Habitat({ volume, selectedPlane, setSelectedPlane, floorCount }) {
  const totalHeight = 10; // altezza cilindro
  const radius = Math.sqrt(volume / (Math.PI * totalHeight));
  const planeHeight = totalHeight / floorCount; // Altezza dinamica per piano

  return (
    <>
      {[...Array(floorCount)].map((_, idx) => {
        const y = -totalHeight/2 + planeHeight/2 + idx*planeHeight;
        return (
          <mesh
            key={idx}
            position={[0, y, 0]}
            onClick={() => setSelectedPlane(idx)}
          >
            <cylinderGeometry args={[radius, radius, planeHeight, 32, 1, true]} />
            <meshStandardMaterial
              color={selectedPlane === idx ? 0xffaa00 : 0x2d6cdf}
              opacity={selectedPlane === idx ? 0.6 : 0.3}
              transparent
            />
          </mesh>
        );
      })}
      {/* freccia indicatore */}
      {selectedPlane !== null && (
        <mesh position={[0, -totalHeight/2 + planeHeight/2 + selectedPlane*planeHeight, radius + 0.5]}>
          <coneGeometry args={[0.3, 0.8, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </>
  );
}

export default function OrbitSetup({ onBack }) {
  const [people, setPeople] = useState(2);
  const [duration, setDuration] = useState(30); // giorni
  const [floors, setFloors] = useState(3);
  const [volume, setVolume] = useState(null);
  const [selectedPlane, setSelectedPlane] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    // Stima volume basata su persone, durata e piani
    const vol = people * 10 + duration * 0.5 + floors * 5;
    setVolume(vol);
  };


  return (
    <div className="chosen-root">
      {!volume ? (
        <>
          <h2>Create your habitat in orbit</h2>
          <form onSubmit={handleGenerate} className="form-box">
            <label>
              Number of people
              <input type="number" min="1" value={people} onChange={e=>setPeople(Number(e.target.value))}/>
            </label>
            <label>
              Duration (days)
              <input type="number" min="1" value={duration} onChange={e=>setDuration(Number(e.target.value))}/>
            </label>
            <label>
              Number of floor
              <input type="number" min="1"  value={floors} onChange={e=>setFloors(Number(e.target.value))}/>
            </label>
            <button type="submit" className="gen-btn">Create habitat</button>
          </form>
          <button className="back-btn" onClick={onBack}>Go back</button>
        </>
      ) : (
        <>
          <h2>Habitat in orbit 🌍</h2>
          <div className="canvas-box">
            <Canvas camera={{position:[0,15,20], fov:50}}>
              <ambientLight intensity={0.4}/>
              <directionalLight position={[10,10,5]}/>
              <Habitat
                volume={volume}
                selectedPlane={selectedPlane}
                setSelectedPlane={setSelectedPlane}
                floorCount={floors}
              />
              <OrbitControls />
            </Canvas>
          </div>
          {selectedPlane !== null && (
            <Cylinder2DView
              radius={Math.sqrt(volume / (Math.PI * 10)) * 1.5} // scala ingrandita
              planeIndex={selectedPlane}
              peopleCount={people}
            />
          )}
          <button className="back-btn" onClick={onBack}>Go back</button>
        </>
      )}
    </div>
  );
}

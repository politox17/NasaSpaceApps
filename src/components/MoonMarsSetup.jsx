import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box2DView from "./Box2DViews.jsx";

function RoundedBox({ width, height, depth, selectedPlane, setSelectedPlane, type, floorCount }) {
  const planeHeight = height / floorCount; // Altezza dinamica per piano

  return (
    <>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={type==="Moon"?0xaaaaaa:0xff9966}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* piani evidenziati */}
      {[...Array(floorCount)].map((_, idx) => {
        const y = -height/2 + planeHeight/2 + idx*planeHeight;
        return (
          <mesh key={idx} position={[0, y, 0]} onClick={()=>setSelectedPlane(idx)}>
            <boxGeometry args={[width*1.01, planeHeight*0.05, depth*1.01]} />
            <meshStandardMaterial
              color={selectedPlane===idx?0xffaa00:0x2d6cdf}
              opacity={0.6} transparent
            />
          </mesh>
        );
      })}
    </>
  );
}

export default function MoonMarsSetup({ type, onBack }) {
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

  const boxDims = { width: 10, height: 10, depth: 8 };

  return (
    <div className="chosen-root">
      {!volume ? (
        <>
          <h2>Choose yout habitat on {type}</h2>
          <form onSubmit={handleGenerate} className="form-box">
            <label>
              Number of people:
              <input type="number" min="1" value={people} onChange={e=>setPeople(Number(e.target.value))}/>
            </label>
            <label>
              Duration (days):
              <input type="number" min="1" value={duration} onChange={e=>setDuration(Number(e.target.value))}/>
            </label>
            <label>
              Number of floors:
              <input type="number" min="1" value={floors} onChange={e=>setFloors(Number(e.target.value))}/>
            </label>
            <button type="submit" className="gen-btn">Create habitat</button>
          </form>
          <button className="back-btn" onClick={onBack}>Go back</button>
        </>
      ) : (
        <>
          <h2>Habitat on {type}</h2>
          <div className="canvas-box" style={{height:"400px"}}>
            <Canvas camera={{position:[15,15,15], fov:50}}>
              <ambientLight intensity={0.4}/>
              <directionalLight position={[10,10,5]}/>
              <RoundedBox
                width={boxDims.width}
                height={boxDims.height}
                depth={boxDims.depth}
                selectedPlane={selectedPlane}
                setSelectedPlane={setSelectedPlane}
                type={type}
                floorCount={floors}
              />
              <OrbitControls />
            </Canvas>
          </div>

          {selectedPlane!==null && (
            <Box2DView
              width={boxDims.width}
              depth={boxDims.depth}
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

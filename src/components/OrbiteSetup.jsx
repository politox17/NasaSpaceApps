import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cylinder2DView from "./Cylinder2D.jsx";
import "./../styles/Statistics.css";

function Habitat({ volume, selectedPlane, setSelectedPlane, floorCount }) {
  const totalHeight = 10;
  const radius = Math.sqrt(volume / (Math.PI * totalHeight));
  const planeHeight = totalHeight / floorCount;

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
      {selectedPlane !== null && (
        <mesh position={[0, -totalHeight/2 + planeHeight/2 + selectedPlane*planeHeight, radius + 0.5]}>
          <coneGeometry args={[0.3, 0.8, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </>
  );
}

function StatisticsView({ floorObjects, volume, floors, onBack }) {
  const allObjects = Object.values(floorObjects).flat();
  const objectCount = allObjects.length;
  const uniqueObjects = [...new Set(allObjects.map(obj => obj.name))];
  const totalMass = allObjects.reduce((sum, obj) => sum + obj.mass, 0);
  const totalPeopleCapacity = allObjects.reduce((sum, obj) => sum + obj.people, 0);
  const radius = Math.sqrt(volume / (Math.PI * 10));
  const totalVolume = volume * floors;

  return (
    <div className="statistics-container">
      <h2>Statistics - Orbital Habitat</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🌍 Overview</h3>
          <div className="stat-item">
            <span className="stat-label">Total Floors:</span>
            <span className="stat-value">{floors}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Radius:</span>
            <span className="stat-value">{radius.toFixed(1)} m</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Volume per Floor:</span>
            <span className="stat-value">{volume.toFixed(1)} m³</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Volume:</span>
            <span className="stat-value">{totalVolume.toFixed(1)} m³</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>📦 Objects</h3>
          <div className="stat-item">
            <span className="stat-label">Total Objects:</span>
            <span className="stat-value">{objectCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unique Types:</span>
            <span className="stat-value">{uniqueObjects.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Mass:</span>
            <span className="stat-value">{totalMass.toFixed(1)} kg</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">People Capacity:</span>
            <span className="stat-value">{totalPeopleCapacity}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>🏗️ Objects per Floor</h3>
          <div className="floor-stats">
            {Object.entries(floorObjects).map(([floorIndex, objects]) => (
              <div key={floorIndex} className="floor-stat-item">
                <h4>Floor {parseInt(floorIndex) + 1}</h4>
                <div className="floor-object-count">
                  {objects.length} objects • {objects.reduce((sum, obj) => sum + obj.mass, 0).toFixed(1)}kg
                </div>
                <div className="floor-object-list">
                  {objects.map((obj, idx) => (
                    <div key={idx} className="small-object-item">
                      <span>{obj.name}</span>
                      <span>{obj.mass}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card full-width">
          <h3>🎯 Complete Object List</h3>
          <div className="object-list">
            {uniqueObjects.map((objName, idx) => {
              const allOfType = allObjects.filter(obj => obj.name === objName);
              const count = allOfType.length;
              const totalMassForType = allOfType.reduce((sum, obj) => sum + obj.mass, 0);
              const floorsWithObject = Object.entries(floorObjects)
                .filter(([_, objects]) => objects.some(obj => obj.name === objName))
                .map(([floorIndex]) => parseInt(floorIndex) + 1);
              
              return (
                <div key={idx} className="object-item">
                  <span className="object-name">{objName}</span>
                  <span className="object-count">×{count}</span>
                  <span className="object-floors">Floors: {floorsWithObject.join(', ')}</span>
                  <span className="object-mass">{totalMassForType.toFixed(1)}kg</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="back-btn" onClick={onBack}>Back to Habitat</button>
    </div>
  );
}

export default function OrbitSetup({ onBack }) {
  const [people, setPeople] = useState(2);
  const [duration, setDuration] = useState(30);
  const [floors, setFloors] = useState(3);
  const [volume, setVolume] = useState(null);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [floorObjects, setFloorObjects] = useState({});
  const [showStatistics, setShowStatistics] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    const vol = people * 10 + duration * 0.5 + floors * 5;
    setVolume(vol);
    const initialObjects = {};
    for (let i = 0; i < floors; i++) {
      initialObjects[i] = [];
    }
    setFloorObjects(initialObjects);
  };

  const handleObjectsUpdate = (planeIndex, objects) => {
    setFloorObjects(prev => ({
      ...prev,
      [planeIndex]: objects
    }));
  };

  if (showStatistics) {
    return (
      <StatisticsView 
        floorObjects={floorObjects}
        volume={volume}
        floors={floors}
        onBack={() => setShowStatistics(false)}
      />
    );
  }

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
          <div className="floor-navigation">
            <h3>Select Floor:</h3>
            <div className="floor-buttons">
              {[...Array(floors)].map((_, idx) => (
                <button
                  key={idx}
                  className={`floor-btn ${selectedPlane === idx ? 'active' : ''}`}
                  onClick={() => setSelectedPlane(idx)}
                >
                  Floor {idx + 1} ({floorObjects[idx]?.length || 0} objects)
                </button>
              ))}
            </div>
          </div>

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
              radius={Math.sqrt(volume / (Math.PI * 10)) * 1.5}
              planeIndex={selectedPlane}
              peopleCount={people}
              objects={floorObjects[selectedPlane] || []}
              onObjectsUpdate={(objects) => handleObjectsUpdate(selectedPlane, objects)}
            />
          )}
          <div className="action-buttons">
            <button className="stats-btn" onClick={() => setShowStatistics(true)}>
              📊 Generate Statistics
            </button>
            <button className="back-btn" onClick={onBack}>Go back</button>
          </div>
        </>
      )}
    </div>
  );
}
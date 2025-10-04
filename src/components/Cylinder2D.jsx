import React, { useState } from "react";
import { isValidObject, getObjectDimensions } from "../data/objectsDatabase.js";

export default function Orbit2DView({ radius, planeIndex }) {
  const [objects, setObjects] = useState([]);
  const [inputName, setInputName] = useState("");
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [collision, setCollision] = useState(false);
  const [validationError, setValidationError] = useState("");
  const scale = 50;

  const handleAdd = () => {
    if (!inputName) return;
    
    // Validazione oggetto
    if (!isValidObject(inputName)) {
      setValidationError(`Oggetto "${inputName}" non valido. Usa solo oggetti dalla lista consentita.`);
      return;
    }
    
    // Ottieni dimensioni ergonomiche
    const dimensions = getObjectDimensions(inputName);
    if (!dimensions) {
      setValidationError("Errore nel recupero delle dimensioni dell'oggetto.");
      return;
    }
    
    // Calcola dimensioni in pixel (usando ergonomic width e length)
    const objWidth = dimensions.ergonomicWidth * scale;
    const objHeight = dimensions.ergonomicLength * scale;
    
    const obj = {
      name: inputName,
      x: 0,
      y: 0,
      width: objWidth,
      height: objHeight,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      error: false,
      mass: dimensions.mass,
      people: dimensions.people
    };
    
    setObjects([...objects, obj]);
    setInputName("");
    setValidationError("");
  };

  const handleMouseDown = (idx) => setDraggingIdx(idx);

  const handleMouseMove = (e) => {
    if (draggingIdx === null) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - svgRect.left - 150) / scale;
    const y = (e.clientY - svgRect.top - 150) / scale;

    const newObjects = [...objects];
    newObjects[draggingIdx] = { ...newObjects[draggingIdx], x, y };

    // Controllo collisioni
    let anyCollision = false;
    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].error = false;
      for (let j = i + 1; j < newObjects.length; j++) {
        const a = newObjects[i];
        const b = newObjects[j];
        if (
          Math.abs(a.x - b.x) < (a.width / scale + b.width / scale) / 2 &&
          Math.abs(a.y - b.y) < (a.height / scale + b.height / scale) / 2
        ) {
          a.error = true;
          b.error = true;
          anyCollision = true;
        }
      }
    }

    setCollision(anyCollision);
    setObjects(newObjects);
  };

  const handleMouseUp = () => setDraggingIdx(null);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Orbital view - Floor {planeIndex + 1}</h3>
      {collision && (
        <p style={{ color: "red", fontWeight: "bold" }}>Error: overlapping object!!!</p>
      )}
      {validationError && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {validationError}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        {/* Controlli e legenda */}
        <div>
          <input
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
              setValidationError(""); // Reset error when typing
            }}
            placeholder="Nome oggetto (es: Personal recreation)"
            style={{ width: "200px", marginRight: "10px" }}
          />
          <button onClick={handleAdd}>Add object</button>

          <h4 style={{ marginTop: "10px" }}>Legend</h4>
          {objects.map((obj, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: obj.error ? "red" : obj.color,
                  marginRight: "5px",
                  border: "1px solid #000",
                }}
              />
              <div style={{ fontSize: "0.8rem" }}>
                <div style={{ fontWeight: "bold" }}>{obj.name}</div>
                <div style={{ color: "#666" }}>
                  Massa: {obj.mass}kg | Persone: {obj.people}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Area grafica */}
        <svg
          width={300}
          height={300}
          style={{ border: "1px solid #555", cursor: "grab" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <clipPath id="circleClip">
              <circle cx={150} cy={150} r={radius * scale} />
            </clipPath>
          </defs>

          <circle
            cx={150}
            cy={150}
            r={radius * scale}
            fill="none"
            stroke="#2d6cdf"
            strokeWidth="2"
          />

          <g clipPath="url(#circleClip)">
            {objects.map((obj, idx) => {
              const cx = 150 + obj.x * scale - obj.width / 2;
              const cy = 150 + obj.y * scale - obj.height / 2;
              return (
                <rect
                  key={idx}
                  x={cx}
                  y={cy}
                  width={obj.width}
                  height={obj.height}
                  fill={obj.error ? "red" : obj.color}
                  onMouseDown={() => handleMouseDown(idx)}
                />
              );
            })}
          </g>
        </svg>
      </div>

    </div>
  );
}

import React, { useState } from "react";
import { isValidObject, getObjectDimensions } from "../data/objectsDatabase.js";

export default function Box2DView({ width, depth, planeIndex }) {
  const [objects, setObjects] = useState([]);
  const [inputName, setInputName] = useState("");
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [collision, setCollision] = useState(false);
  const [validationError, setValidationError] = useState("");

  const scale = 25;

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

    // collisione tra oggetti
    let anyCollision = false;
    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].error = false;
      for (let j = i + 1; j < newObjects.length; j++) {
        const a = newObjects[i];
        const b = newObjects[j];
        if (
          Math.abs(a.x - b.x) < (a.width + b.width) / 2 / scale &&
          Math.abs(a.y - b.y) < (a.height + b.height) / 2 / scale
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
    <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
      <div>
        <h3>Piano {planeIndex + 1} - Top-Down</h3>
        {collision && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Error: overlapping objects!!!
          </p>
        )}
        {validationError && (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
            {validationError}
          </p>
        )}
        <div style={{ marginBottom: "10px" }}>
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
        </div>

        <svg
          width={300}
          height={300}
          style={{ border: "1px solid #555", cursor: "grab" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <clipPath id="rectClip">
              <rect
                x={150 - (width * scale) / 2}
                y={150 - (depth * scale) / 2}
                width={width * scale}
                height={depth * scale}
                rx={15}
                ry={15}
              />
            </clipPath>
          </defs>

          {/* bordo capsula */}
          <rect
            x={150 - (width * scale) / 2}
            y={150 - (depth * scale) / 2}
            width={width * scale}
            height={depth * scale}
            rx={15}
            ry={15}
            fill="none"
            stroke="#2d6cdf"
            strokeWidth={2}
          />

          {/* oggetti visibili solo dentro */}
          <g clipPath="url(#rectClip)">
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

      {/* LEGGENDA */}
      <div style={{ minWidth: "140px" }}>
        <h4>Legend</h4>
        {objects.length === 0 && (
          <p style={{ color: "#888", fontSize: "0.85rem" }}>
            No object
          </p>
        )}
        {objects.map((obj, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: obj.error ? "red" : obj.color,
                border: "1px solid #333",
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
    </div>
  );
}

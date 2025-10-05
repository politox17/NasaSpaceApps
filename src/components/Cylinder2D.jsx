import React, { useState, useEffect } from "react";
import { isValidObject, getObjectDimensions, getMissingMandatoryObjects, areAllMandatoryObjectsPresent } from "../data/objectsDatabase.js";

export default function Orbit2DView({ radius, planeIndex, peopleCount = 2, objects = [], onObjectsUpdate }) {
  const [localObjects, setLocalObjects] = useState(objects);
  const [inputName, setInputName] = useState("");
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [collision, setCollision] = useState(false);
  const [validationError, setValidationError] = useState("");
  
  // SCALA DINAMICA basata sul raggio reale dell'habitat
  const scale = 150 / (radius * 1.2);

  // Sincronizza con gli oggetti passati dalle props
  useEffect(() => {
    setLocalObjects(objects);
  }, [objects]);

  const handleAdd = () => {
    if (!inputName) return;
    
    if (!isValidObject(inputName)) {
      setValidationError(`Oggetto "${inputName}" non valido. Usa solo oggetti dalla lista consentita.`);
      return;
    }
    
    const dimensions = getObjectDimensions(inputName);
    if (!dimensions) {
      setValidationError("Errore nel recupero delle dimensioni dell'oggetto.");
      return;
    }
    
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
      people: dimensions.people,
      realWidth: dimensions.ergonomicWidth,
      realHeight: dimensions.ergonomicLength
    };
    
    const newObjects = [...localObjects, obj];
    setLocalObjects(newObjects);
    if (onObjectsUpdate) {
      onObjectsUpdate(newObjects);
    }
    setInputName("");
    setValidationError("");
  };

  const handleMouseDown = (idx) => setDraggingIdx(idx);

  const handleMouseMove = (e) => {
    if (draggingIdx === null) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - svgRect.left - 150) / scale;
    const y = (e.clientY - svgRect.top - 150) / scale;

    const newObjects = [...localObjects];
    newObjects[draggingIdx] = { ...newObjects[draggingIdx], x, y };

    let anyCollision = false;

    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].error = false;
      
      for (let j = i + 1; j < newObjects.length; j++) {
        const a = newObjects[i];
        const b = newObjects[j];
        if (
          Math.abs(a.x - b.x) < (a.realWidth + b.realWidth) / 2 &&
          Math.abs(a.y - b.y) < (a.realHeight + b.realHeight) / 2
        ) {
          a.error = true;
          b.error = true;
          anyCollision = true;
        }
      }
    }

    setCollision(anyCollision);
    setLocalObjects(newObjects);
    if (onObjectsUpdate) {
      onObjectsUpdate(newObjects);
    }
  };

  const handleMouseUp = () => setDraggingIdx(null);

  // Calcola oggetti obbligatori mancanti
  const missingMandatory = getMissingMandatoryObjects(peopleCount, localObjects);
  const allMandatoryPresent = areAllMandatoryObjectsPresent(peopleCount, localObjects);

  // Calcola area disponibile e utilizzata
  const totalArea = Math.PI * radius * radius;
  let usedArea = 0;
  localObjects.forEach(obj => {
    usedArea += obj.realWidth * obj.realHeight;
  });
  const areaUsagePercent = ((usedArea / totalArea) * 100).toFixed(1);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Orbital Habitat - Floor {planeIndex + 1}</h3>
      
      {/* Informazioni sullo spazio */}
      <div style={{ 
        backgroundColor: "#e8f4fd", 
        border: "1px solid #b8daff", 
        borderRadius: "4px", 
        padding: "10px", 
        marginBottom: "10px" 
      }}>
        <p style={{ color: "#004085", margin: "2px 0", fontSize: "0.9rem" }}>
          <strong>Spazio disponibile:</strong> Raggio {radius.toFixed(1)}m • Area {totalArea.toFixed(1)}m²
        </p>
        <p style={{ color: "#004085", margin: "2px 0", fontSize: "0.9rem" }}>
          <strong>Spazio utilizzato:</strong> {usedArea.toFixed(1)}m² ({areaUsagePercent}%)
        </p>
        <p style={{ color: "#004085", margin: "2px 0", fontSize: "0.8rem", fontStyle: "italic" }}>
          Gli oggetti possono estendersi oltre i bordi - la parte eccedente verrà tagliata
        </p>
      </div>

      {collision && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ Errore: oggetti in collisione!
        </p>
      )}
      {validationError && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {validationError}
        </p>
      )}
      {!allMandatoryPresent && (
        <div style={{ 
          backgroundColor: "#fff3cd", 
          border: "1px solid #ffeaa7", 
          borderRadius: "4px", 
          padding: "10px", 
          marginBottom: "10px" 
        }}>
          <p style={{ color: "#856404", fontWeight: "bold", margin: "0 0 5px 0" }}>
            ⚠️ Oggetti obbligatori mancanti per {peopleCount} persone:
          </p>
          {missingMandatory.map((item, idx) => (
            <p key={idx} style={{ color: "#856404", margin: "2px 0", fontSize: "0.9rem" }}>
              • {item.name}: {item.missing} mancanti (richiesti: {item.required}, presenti: {item.current})
            </p>
          ))}
        </div>
      )}
      {allMandatoryPresent && (
        <div style={{ 
          backgroundColor: "#d4edda", 
          border: "1px solid #c3e6cb", 
          borderRadius: "4px", 
          padding: "10px", 
          marginBottom: "10px" 
        }}>
          <p style={{ color: "#155724", fontWeight: "bold", margin: "0" }}>
            ✅ Tutti gli oggetti obbligatori sono presenti!
          </p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        {/* Controlli e legenda */}
        <div style={{ minWidth: "200px" }}>
          <div style={{ marginBottom: "15px" }}>
            <input
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setValidationError("");
              }}
              placeholder="Nome oggetto (es: Personal recreation)"
              style={{ width: "100%", marginBottom: "8px" }}
            />
            <button onClick={handleAdd} style={{ width: "100%" }}>Aggiungi oggetto</button>
          </div>

          <h4 style={{ marginTop: "10px", marginBottom: "8px" }}>Legenda Oggetti</h4>
          {localObjects.length === 0 && (
            <p style={{ color: "#888", fontSize: "0.85rem", fontStyle: "italic" }}>
              Nessun oggetto aggiunto
            </p>
          )}
          {localObjects.map((obj, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                padding: "4px",
                backgroundColor: obj.error ? "#ffe6e6" : "transparent",
                borderRadius: "3px"
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: obj.error ? "red" : obj.color,
                  marginRight: "8px",
                  border: "1px solid #333",
                  flexShrink: 0
                }}
              />
              <div style={{ fontSize: "0.8rem", flex: 1 }}>
                <div style={{ fontWeight: "bold" }}>{obj.name}</div>
                <div style={{ color: "#666", fontSize: "0.75rem" }}>
                  {obj.realWidth.toFixed(2)}m × {obj.realHeight.toFixed(2)}m
                </div>
                <div style={{ color: "#666", fontSize: "0.75rem" }}>
                  Massa: {obj.mass}kg • Persone: {obj.people}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Area grafica */}
        <div>
          <svg
            width={300}
            height={300}
            style={{ border: "1px solid #555", cursor: draggingIdx !== null ? "grabbing" : "grab" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <clipPath id="circleClip">
                <circle cx={150} cy={150} r={radius * scale} />
              </clipPath>
            </defs>

            {/* Cerchio principale */}
            <circle
              cx={150}
              cy={150}
              r={radius * scale}
              fill="#f8f9fa"
              stroke="#2d6cdf"
              strokeWidth="2"
            />

            {/* Griglia di riferimento (ogni metro) */}
            {Array.from({ length: Math.floor(radius) }).map((_, i) => {
              const circleRadius = (i + 1) * scale;
              if (circleRadius < radius * scale) {
                return (
                  <circle
                    key={i}
                    cx={150}
                    cy={150}
                    r={circleRadius}
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                  />
                );
              }
              return null;
            })}

            {/* Oggetti - CLIPPATI alla forma circolare */}
            <g clipPath="url(#circleClip)">
              {localObjects.map((obj, idx) => {
                const cx = 150 + obj.x * scale - obj.width / 2;
                const cy = 150 + obj.y * scale - obj.height / 2;
                return (
                  <g key={idx}>
                    <rect
                      x={cx}
                      y={cy}
                      width={obj.width}
                      height={obj.height}
                      fill={obj.error ? "red" : obj.color}
                      stroke={obj.error ? "#000" : "#333"}
                      strokeWidth="1"
                      onMouseDown={() => handleMouseDown(idx)}
                    />
                    {/* Etichetta dimensioni (solo se l'oggetto è abbastanza grande) */}
                    {obj.width > 40 && obj.height > 20 && (
                      <text
                        x={cx + obj.width / 2}
                        y={cy + obj.height / 2}
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="10"
                        fill="#000"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {obj.realWidth.toFixed(2)}×{obj.realHeight.toFixed(2)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Indicatore centro */}
            <circle cx={150} cy={150} r={2} fill="red" />
          </svg>
          
          <div style={{ textAlign: "center", marginTop: "8px", fontSize: "0.8rem", color: "#666" }}>
            Trascina gli oggetti per posizionarli • Scala: 1m = {(1 * scale).toFixed(0)}px
          </div>
        </div>
      </div>
    </div>
  );
}
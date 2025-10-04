// Database degli oggetti consentiti per la missione spaziale
// Ogni oggetto ha: nome, massa, copertura, persone, dimensioni fisiche e ergonomiche

export const validObjects = {
  "Personal recreation": {
    mass: 2.5,
    coverage: 1.0,
    people: 2.5,
    height: 0.18,
    length: 0.22,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Tabletop games & artistic recreation": {
    mass: 1.3,
    coverage: 1.0,
    people: 1.3,
    height: 0.14,
    length: 0.19,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Hand cleaning": {
    mass: 1.3,
    coverage: 1.0,
    people: 1.3,
    height: 0.18,
    length: 0.14,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.01,
    ergonomicWidth: 1.01
  },
  "Changing volume": {
    mass: 20.0,
    coverage: 1.0,
    people: 20,
    height: 0.9,
    length: 0.4,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.18,
    ergonomicWidth: 1.18
  },
  "Facial cleaning": {
    mass: 1.3,
    coverage: 1.0,
    people: 1.3,
    height: 0.15,
    length: 0.15,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.01,
    ergonomicWidth: 1.01
  },
  "Finger/toenail clipping": {
    mass: 0.1,
    coverage: 1.0,
    people: 0.1,
    height: 0.05,
    length: 0.08,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 0.95,
    ergonomicWidth: 0.95
  },
  "Full body cleaning": {
    mass: 37.5,
    coverage: 1.0,
    people: 37.5,
    height: 0.91,
    length: 0.43,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.24,
    ergonomicWidth: 1.24
  },
  "Hair styling/grooming": {
    mass: 0.8,
    coverage: 1.0,
    people: 0.8,
    height: 0.12,
    length: 0.15,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 0.99,
    ergonomicWidth: 0.99
  },
  "Oral hygiene": {
    mass: 0.5,
    coverage: 1.0,
    people: 0.5,
    height: 0.08,
    length: 0.15,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 0.97,
    ergonomicWidth: 0.97
  },
  "Viewing appearance": {
    mass: 0.5,
    coverage: 1.0,
    people: 0.5,
    height: 0.29,
    length: 0.19,
    width: 2,
    ergonomicHeight: 0.6,
    ergonomicLength: 0.7,
    ergonomicWidth: 0.7
  },
  "Shaving": {
    mass: 0.3,
    coverage: 1.0,
    people: 0.3,
    height: 0.08,
    length: 0.12,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 0.95,
    ergonomicWidth: 0.95
  },
  "Skin care": {
    mass: 0.8,
    coverage: 1.0,
    people: 0.8,
    height: 0.1,
    length: 0.18,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 0.98,
    ergonomicWidth: 0.98
  },
  "Changing clothes": {
    mass: 5.0,
    coverage: 1.0,
    people: 5,
    height: 0.55,
    length: 0.25,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.06,
    ergonomicWidth: 1.06
  },
  "Meditation": {
    mass: 2.0,
    coverage: 1.0,
    people: 2,
    height: 0.12,
    length: 0.37,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Non-sleep rest / relaxation": {
    mass: 3.0,
    coverage: 1.0,
    people: 3,
    height: 0.16,
    length: 0.43,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Single person private work/ent./comm.": {
    mass: 5.0,
    coverage: 1.0,
    people: 5,
    height: 0.37,
    length: 0.29,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.08,
    ergonomicWidth: 1.08
  },
  "Sleep accommodation": {
    mass: 30.0,
    coverage: 1.0,
    people: 30,
    height: 0.47,
    length: 0.99,
    width: 2,
    ergonomicHeight: 1.2,
    ergonomicLength: 1.03,
    ergonomicWidth: 1.03
  },
  "Viewing appearance in private quarters": {
    mass: 0.4,
    coverage: 1.0,
    people: 0.4,
    height: 0.28,
    length: 0.21,
    width: 2,
    ergonomicHeight: 0.6,
    ergonomicLength: 0.7,
    ergonomicWidth: 0.7
  },
  "Computer data entry / manipulation": {
    mass: 0.5,
    coverage: 1.0,
    people: 0.5,
    height: 0.05,
    length: 0.26,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.09,
    ergonomicWidth: 1.09
  },
  "Audio communication": {
    mass: 0.5,
    coverage: 1.0,
    people: 0.5,
    height: 0.1,
    length: 0.15,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 0.96,
    ergonomicWidth: 0.96
  },
  "Aerobic exercise (cycle ergometer)": {
    mass: 75.0,
    coverage: 3.0,
    people: 0.92,
    height: 0.61,
    length: 0.38,
    width: 2.2,
    ergonomicHeight: 1.61,
    ergonomicLength: 1.38,
    ergonomicWidth: 1.38
  },
  "Aerobic exercise (treadmill)": {
    mass: 200.0,
    coverage: 3.0,
    people: 1,
    height: 1.07,
    length: 0.53,
    width: 2.3,
    ergonomicHeight: 2.07,
    ergonomicLength: 2.03,
    ergonomicWidth: 2.03
  },
  "Resistive exercise": {
    mass: 270.0,
    coverage: 3.0,
    people: 1.37,
    height: 0.89,
    length: 0.62,
    width: 2.3,
    ergonomicHeight: 2.09,
    ergonomicLength: 1.82,
    ergonomicWidth: 1.82
  },
  "Bone loading": {
    mass: 25.0,
    coverage: 3.0,
    people: 0.33,
    height: 0.52,
    length: 0.33,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Sensorimotor conditioning": {
    mass: 30.0,
    coverage: 3.0,
    people: 0.7,
    height: 0.46,
    length: 0.29,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Athletic games": {
    mass: 4.0,
    coverage: 2.0,
    people: 0.27,
    height: 0.27,
    length: 0.27,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Video/movie viewing": {
    mass: 8.0,
    coverage: 2.0,
    people: 0.11,
    height: 1.07,
    length: 0.2,
    width: 2,
    ergonomicHeight: 1.07,
    ergonomicLength: 1.1,
    ergonomicWidth: 1.1
  },
  "Window viewing": {
    mass: 10.0,
    coverage: 6.0,
    people: 0.2,
    height: 0.5,
    length: 0.2,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.1,
    ergonomicWidth: 1.1
  },
  "Liquid waste collection": {
    mass: 50.0,
    coverage: 3.0,
    people: 0.74,
    height: 0.47,
    length: 0.41,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.31,
    ergonomicWidth: 1.31
  },
  "Solid waste collection": {
    mass: 120.0,
    coverage: 3.0,
    people: 0.96,
    height: 0.64,
    length: 0.56,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.46,
    ergonomicWidth: 1.46
  },
  "Physical work surface access": {
    mass: 75.0,
    coverage: 3.0,
    people: 0.16,
    height: 1.93,
    length: 0.97,
    width: 2,
    ergonomicHeight: 1.93,
    ergonomicLength: 1.87,
    ergonomicWidth: 1.87
  },
  "Small item containment": {
    mass: 10.0,
    coverage: 6.0,
    people: 0.31,
    height: 0.47,
    length: 0.31,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.11,
    ergonomicWidth: 1.11
  },
  "Temporary stowage": {
    mass: 5.0,
    coverage: 6.0,
    people: 0.43,
    height: 0.52,
    length: 0.17,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 0.97,
    ergonomicWidth: 0.97
  },
  "Computer display and control interface": {
    mass: 16.0,
    coverage: 3.0,
    people: 0.1,
    height: 0.89,
    length: 0.51,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.41,
    ergonomicWidth: 1.41
  },
  "Equipment diagnostics": {
    mass: 12.0,
    coverage: 6.0,
    people: 0.32,
    height: 0.4,
    length: 0.28,
    width: 2,
    ergonomicHeight: 1,
    ergonomicLength: 1.08,
    ergonomicWidth: 1.08
  },
  "Soft goods fabrication": {
    mass: 15.0,
    coverage: 6.0,
    people: 0.1,
    height: 1,
    length: 0.6,
    width: 2,
    ergonomicHeight: 1,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Suit component testing": {
    mass: 40.0,
    coverage: 6.0,
    people: 0.66,
    height: 0.48,
    length: 0.36,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.26,
    ergonomicWidth: 1.26
  },
  "Video communication": {
    mass: 6.0,
    coverage: 6.0,
    people: 0.12,
    height: 0.48,
    length: 0.3,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Full crew dining": {
    mass: 25.0,
    coverage: 2.0,
    people: 0.1,
    height: 1.41,
    length: 0.8,
    width: 2,
    ergonomicHeight: 1.6,
    ergonomicLength: 2,
    ergonomicWidth: 2
  },
  "Food item sorting": {
    mass: 12.0,
    coverage: 6.0,
    people: 0.35,
    height: 0.56,
    length: 0.28,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.18,
    ergonomicWidth: 1.18
  },
  "Food preparation": {
    mass: 80.0,
    coverage: 6.0,
    people: 0.81,
    height: 0.74,
    length: 0.44,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.34,
    ergonomicWidth: 1.34
  },
  "Utensil and food equipment hygiene": {
    mass: 25.0,
    coverage: 6.0,
    people: 0.52,
    height: 0.46,
    length: 0.35,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.25,
    ergonomicWidth: 1.25
  },
  "Advanced medical care": {
    mass: 60.0,
    coverage: 6.0,
    people: 0.85,
    height: 0.5,
    length: 0.43,
    width: 2,
    ergonomicHeight: 1.1,
    ergonomicLength: 1.23,
    ergonomicWidth: 1.23
  },
  "Ambulatory care": {
    mass: 20.0,
    coverage: 6.0,
    people: 0.5,
    height: 0.43,
    length: 0.29,
    width: 2,
    ergonomicHeight: 1.03,
    ergonomicLength: 1.09,
    ergonomicWidth: 1.09
  },
  "Basic medical care": {
    mass: 10.0,
    coverage: 6.0,
    people: 0.24,
    height: 0.38,
    length: 0.24,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Dental care": {
    mass: 8.0,
    coverage: 6.0,
    people: 0.39,
    height: 0.28,
    length: 0.23,
    width: 2,
    ergonomicHeight: 0.88,
    ergonomicLength: 1.03,
    ergonomicWidth: 1.03
  },
  "Private telemedicine": {
    mass: 6.0,
    coverage: 6.0,
    people: 0.35,
    height: 0.28,
    length: 0.17,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.07,
    ergonomicWidth: 1.07
  },
  "Two person meetings": {
    mass: 40.0,
    coverage: 6.0,
    people: 0.14,
    height: 1.63,
    length: 0.82,
    width: 2,
    ergonomicHeight: 1.63,
    ergonomicLength: 2.02,
    ergonomicWidth: 2.02
  },
  "Command and control interface": {
    mass: 15.0,
    coverage: 6.0,
    people: 0.39,
    height: 0.46,
    length: 0.26,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.16,
    ergonomicWidth: 1.16
  },
  "Team meetings": {
    mass: 20.0,
    coverage: 2.0,
    people: 0.09,
    height: 1.37,
    length: 0.77,
    width: 2,
    ergonomicHeight: 1.6,
    ergonomicLength: 1.97,
    ergonomicWidth: 1.97
  },
  "Mission training": {
    mass: 18.0,
    coverage: 2.0,
    people: 0.39,
    height: 0.47,
    length: 0.31,
    width: 2.2,
    ergonomicHeight: 1.5,
    ergonomicLength: 1.5,
    ergonomicWidth: 1.5
  },
  "Command and control": {
    mass: 20.0,
    coverage: 6.0,
    people: 0.52,
    height: 0.42,
    length: 0.28,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.18,
    ergonomicWidth: 1.18
  },
  "Teleoperation and crew communication": {
    mass: 25.0,
    coverage: 6.0,
    people: 0.55,
    height: 0.45,
    length: 0.3,
    width: 2,
    ergonomicHeight: 0.9,
    ergonomicLength: 1.2,
    ergonomicWidth: 1.2
  },
  "Trash containment": {
    mass: 8.0,
    coverage: 6.0,
    people: 0.4,
    height: 0.34,
    length: 0.27,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.07,
    ergonomicWidth: 1.07
  },
  "Trash packing for disposal": {
    mass: 35.0,
    coverage: 6.0,
    people: 0.59,
    height: 0.47,
    length: 0.36,
    width: 2,
    ergonomicHeight: 0.8,
    ergonomicLength: 1.16,
    ergonomicWidth: 1.16
  }
};

// Funzione per validare se un oggetto è valido
export const isValidObject = (objectName) => {
  return validObjects.hasOwnProperty(objectName);
};

// Funzione per ottenere le dimensioni ergonomiche di un oggetto
export const getObjectDimensions = (objectName) => {
  if (!isValidObject(objectName)) {
    return null;
  }
  return validObjects[objectName];
};

# Sistema Oggetti Obbligatori

## Panoramica
Il sistema ora include una logica per gli oggetti obbligatori che devono essere presenti nell'habitat in base al numero di persone specificato.

## Oggetti Obbligatori
Per ogni persona nell'habitat, sono richiesti i seguenti oggetti:

### 1. **Sleep accommodation** (Letto)
- **Massa**: 30.0kg
- **Persone per oggetto**: 30
- **Calcolo**: 1 letto ogni 30 persone (arrotondato per eccesso)
- **Esempio**: 4 persone = 1 letto, 35 persone = 2 letti

### 2. **Hand cleaning** (Igiene mani)
- **Massa**: 1.3kg
- **Persone per oggetto**: 1.3
- **Calcolo**: 1 ogni 1.3 persone
- **Esempio**: 4 persone = 4 oggetti

### 3. **Facial cleaning** (Igiene viso)
- **Massa**: 1.3kg
- **Persone per oggetto**: 1.3
- **Calcolo**: 1 ogni 1.3 persone
- **Esempio**: 4 persone = 4 oggetti

### 4. **Oral hygiene** (Igiene orale)
- **Massa**: 0.5kg
- **Persone per oggetto**: 0.5
- **Calcolo**: 1 ogni 0.5 persone
- **Esempio**: 4 persone = 8 oggetti

### 5. **Changing clothes** (Cambio vestiti)
- **Massa**: 5.0kg
- **Persone per oggetto**: 5
- **Calcolo**: 1 ogni 5 persone
- **Esempio**: 4 persone = 1 oggetto, 6 persone = 2 oggetti

### 6. **Liquid waste collection** (Gestione rifiuti liquidi)
- **Massa**: 50.0kg
- **Persone per oggetto**: 0.74
- **Calcolo**: 1 ogni 0.74 persone
- **Esempio**: 4 persone = 6 oggetti

### 7. **Solid waste collection** (Gestione rifiuti solidi)
- **Massa**: 120.0kg
- **Persone per oggetto**: 0.96
- **Calcolo**: 1 ogni 0.96 persone
- **Esempio**: 4 persone = 5 oggetti

## Come Funziona

### 1. **Calcolo Automatico**
Il sistema calcola automaticamente quanti oggetti di ogni tipo sono necessari in base al numero di persone inserito.

### 2. **Avvisi Visivi**
- **Avviso Giallo**: Mostra gli oggetti obbligatori mancanti con quantità richieste e presenti
- **Avviso Verde**: Conferma che tutti gli oggetti obbligatori sono presenti

### 3. **Esempio Pratico**
Se inserisci **4 persone**:
- Sleep accommodation: 1 richiesto
- Hand cleaning: 4 richiesti
- Facial cleaning: 4 richiesti
- Oral hygiene: 8 richiesti
- Changing clothes: 1 richiesto
- Liquid waste collection: 6 richiesti
- Solid waste collection: 5 richiesti

### 4. **Interfaccia Utente**
- Gli avvisi appaiono sopra l'area di disegno 2D
- Mostrano esattamente quanti oggetti mancano
- Si aggiornano in tempo reale quando aggiungi oggetti
- Scompaiono quando tutti gli oggetti obbligatori sono presenti

## Vantaggi
- **Sicurezza**: Garantisce che ogni persona abbia accesso agli oggetti essenziali
- **Efficienza**: Calcola automaticamente le quantità necessarie
- **Chiarezza**: Mostra chiaramente cosa manca
- **Flessibilità**: Permette di aggiungere oggetti opzionali oltre a quelli obbligatori

## Note Tecniche
- Il calcolo usa `Math.ceil()` per arrotondare sempre per eccesso
- Gli oggetti obbligatori sono definiti nel file `objectsDatabase.js`
- La logica è implementata in entrambi i componenti 2D (Box2D e Cylinder2D)
- Il numero di persone viene passato dai componenti principali (MoonMarsSetup e OrbitSetup)

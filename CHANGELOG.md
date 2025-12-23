
# Changelog

## [2.3.1] - 2025-12-23
### UI Polish & Booking Integration
Questa patch introduce miglioramenti mirati alla UX per la gestione degli appuntamenti e raffina l'interfaccia utente.

### Nuove Funzionalità
- **Integrazione EasyBook**:
  - Aggiunto pulsante "Prenota Appuntamento" nella sezione Ufficio con link diretto al portale.
  - Aggiunto **Alert Informativo** nella Home Page per avvisare gli utenti dell'obbligatorietà della prenotazione.
  - Aggiornata la descrizione della card "Ufficio" in Home Page.

### UI Improvements
- **Office Info Card**:
  - Redesign completo della card "Info Ufficio": icone in cerchi colorati, tipografia migliorata, rimozione intestazioni ridondanti.
  - Correzione icona pulsante prenotazione (da testo a icona grafica `Rounded`).

## [2.3.0] - 2025-12-23
### Major Refactoring & Navigation
Questa release introduce un routing reale multipagina e una struttura del progetto moderna e production-ready.

### Breaking Changes (Structural)
- **Refactoring Architetturale**: Tutto il codice sorgente è stato migrato in `src/` (`src/components`, `src/pages`, `src/context`, etc.) per conformità agli standard React/Vite.
- **Routing**: Abbandonata la navigazione "scroll-to-section" in favore di un vero routing client-side con `react-router-dom`:
  - `/`: Home Page (Dashboard).
  - `/profile`: Pagina dedicata alla configurazione pratica.
  - `/documents`: Pagina per la gestione della checklist.
  - `/office`: Informazioni ufficio.

### Nuove Funzionalità
- **Bottom Navigation (Mobile)**:
  - Nuova barra di navigazione inferiore in stile app nativa per dispositivi mobili (visibile < 768px).
  - Accesso rapido a tutte le sezioni principali con icone dedicate.
- **Sidebar Rinnovata**:
  - Restyling completo con icone `Rounded` (corretto bug icone/testo).
  - Migliorata la spaziatura e l'indicatore della pagina attiva.
- **Logo Cliccabile**:
  - Il logo nell'header ora funge da link rapido per tornare alla Home.

### Testing
- **E2E Verification**: Eseguiti test completi su browser per verificare i flussi di navigazione e la responsività.
- **Unit Tests**: Aggiunti test specifici per `ProfileSection` per garantire la robustezza delle regole di validazione età.
- **Resources**: Disabilitata temporaneamente la sezione "Materiale Informativo" nella pagina Documenti.

## [3.2.0] - 2025-12-23
### Feature: Dynamic Validation & Info Box
L'applicazione ora è in grado di leggere e interpretare dinamicamente i documenti di supporto.

### Nuove Funzionalità
- **Validazione Dinamica**:
  - Implementato `LicenseRulesService` per il parsing in tempo reale del file `categorie_patente.md`.
  - Le regole di età non sono più hardcoded ma estratte direttamente dalla documentazione ufficiale.
- **Info Box Intelligente**:
  - Il box informativo ora mostra un **badge "Età Minima"** (es. "18 Anni") estratto dinamicamente.
  - La descrizione della categoria viene caricata dal markdown, garantendo che l'app sia sempre allineata ai documenti.

### Technical
- **Custom Hooks**: Introdotto `useLicenseRules` per gestire il fetching e caching delle regole di validazione.

## [3.1.0] - 2025-12-23
### Feature: Documentation & Smart Validation
Questa release trasforma l'applicazione da un semplice tracker a uno strumento di guida intelligente, integrando fonti ufficiali e regole di business proattive.

### Nuove Funzionalità
- **Materiale Informativo**:
  - Nuova sezione "Materiale Informativo" nella Dashboard.
  - Libreria di PDF ufficiali scaricabili (Tariffe, Requisiti psicofisici, Guide).
  - Componente `ResourcesList` con UI a card, icone categorizzate e download diretto.
- **Validazione Intelligente (Smart Validation)**:
  - Sistema di regole business in real-time.
  - **Rule #1**: Avviso automatico ("Requisito Età Non Soddisfatto") se un candidato minorenne seleziona la patente B.
  - Componente `Alert` aggiornato con stili di avviso (Warning/Amber) e icone corrette (`material-symbols-rounded`).

### Fix & Polish
- **Icone**: Risolto un disallineamento tra font importati (`Rounded`) e classi CSS utilizzate (`Outlined`), ripristinando la corretta visualizzazione delle icone di sistema.
- **Build**: Aggiornato `constants.ts` e i test per includere le nuove risorse e garantire il passaggio della pipeline di build.

## [3.0.0] - 2025-12-22
### Major Release: Premium UI, Router & Performance (V2 + V3)

Questa major release introduce un completo redesign dell'esperienza utente, una nuova architettura di navigazione e significative ottimizazzioni delle performance.

### Nuove Funzionalità (Feature)
- **React Router Integration**:
  - Implementato `react-router-dom` per una gestione robusta della navigazione.
  - Introdotta la `Dashboard` come vista principale.
  - Predisposizione per future rotte aggiuntive.
- **Premium UI Extensions**:
  - **Dark Mode**: Supporto nativo per la modalità scura con toggle nell'header e persistenza della preferenza utente.
  - **Glassmorphism**: Nuovo stile visivo per l'header con effetto blur e trasparenza (`backdrop-blur-xl`).
  - **Animazioni**: Transizioni di pagina fluide e animazioni di espansione liste tramite `framer-motion`.
  - **Confetti Celebration**: Effetto celebrativo al completamento del 100% dei documenti.
- **Enhanced Design System**:
  - Nuova palette colori vibrante e ombreggiature "float".
  - Componenti UI riutilizzabili: `PageTransition`, `ScrollArea`, `Confetti`.

### Ottimizzazioni (Performance & Fix)
- **AppContext Performance**:
  - Risolto un critical bug di re-rendering infinito ("Maximum update depth exceeded").
  - Ottimizzata la logica di aggiornamento della `documentList` per prevenire cicli inutili.
- **DevOps & CI**:
  - Implementata pipeline GitHub Actions (`ci.yml`) per Continuous Integration su ogni push.

## [2.2.2] - 2025-12-22
### Refactoring & Fix
- **Configurazione**: Estratta la configurazione di ESLint e Prettier dal `package.json` in file dedicati (`.eslintrc.cjs` e `.prettierrc`) per una maggiore pulizia e standardizzazione del progetto.

## [2.2.1] - 2025-12-22
### UI & Configurazione
- **Categorie Patente**: Ripristinato l'elenco completo delle categorie (AM, A, B, C, D, CAP) raggruppate per tipologia nel menu a tendina.
- **UI Polish**: Ridotta ulteriormente la dimensione dei checkbox nella checklist documenti (da 24px a 20px) per una migliore armonia visiva.

## [2.2.0] - 2025-12-22
### Engineering & Polish (Fase 6 - Production Ready)
- **CI/CD Pipeline**: 
  - Aggiunto workflow GitHub Actions (`ci.yml`) per eseguire build, linting e test automaticamente ad ogni push/PR.
- **Code Quality**:
  - Aggiunti `.eslintrc.cjs` e `.prettierrc` per standardizzare lo stile del codice e prevenire errori comuni.
  - Aggiunti script `lint`, `lint:fix` e `format` al `package.json`.
- **Architettura Errori**:
  - Creato `services/errorLogging.ts` per centralizzare la gestione delle eccezioni (logging condizionale Dev/Prod).
  - `ErrorBoundary` refactorizzato per utilizzare il nuovo servizio.
- **Visual Polish**:
  - Aggiunto componente `Footer` per completare il layout della pagina, contenente versione app e link di servizio (stub).
  - Migliorato il layout generale in `App.tsx` usando `flex-1` per spingere il footer in basso correttamente.

## [2.2.0-beta.4] - 2025-12-22
### Accessibilità & Navigazione Tastiera (Fase 5 Completata)
- **DocumentList Accessibile**:
  - Le righe dei documenti ora sono focalizzabili (`tabIndex`) e interagibili via tastiera (`Invio`/`Spazio`).
  - Aggiunti attributi `aria-expanded` per comunicare lo stato espanso/collassato agli screen reader.
- **Form Semantici**:
  - Corretta l'associazione tra `label` e `select` in `ProfileSection` usando `htmlFor` e `id` espliciti.
- **Sidebar UX**:
  - Implementata la chiusura del menu laterale premendo il tasto `ESC`.
  - Aggiunto focus management automatico sulle sezioni di destinazione dopo la navigazione.
- **Feedback Utente**:
  - **Modale Successo**: Ora intrappola correttamente il focus e viene annunciato come `dialog` dalle tecnologie assistive.
  - **Alert & Toast**: Aggiunti attributi `aria-live` e `role="status"` per garantire che i messaggi importanti vengano letti automaticamente.

## [2.1.1-beta.3] - 2025-12-22
### Testing & UX Completa (Fase 4 & 5)
- **Testing Coverage**:
  - Completata la suite di test UI con `Button.test.tsx` e `Alert.test.tsx`.
  - Aggiunto test di integrazione per `ToastContext` per garantire che le notifiche funzionino.
- **Navigazione & UX**:
  - Implementato lo "Smooth Scrolling" dalla Sidebar: ora le voci del menu portano direttamente alle sezioni corrispondenti (`Configurazione`, `Documenti`, `Info Ufficio`) invece di essere link morti.
  - Aggiunti ID semantici (`section-profile`, `section-documents`, `section-office`) ai container principali.

## [2.1.0-beta.2] - 2025-12-22
### Testing & Accessibilità (Fase 4 & 5)
- **Infrastruttura DevOps**:
  - Creato `package.json` con script per test (`test`, `test:ui`) e report coverage (`test:coverage`).
  - Configurato `vitest` con provider `v8` per l'analisi della copertura del codice.
- **Unit & Integration Testing**:
  - Aggiunti test per componente UI `Toggle` (verifica rendering ed eventi).
  - Aggiunti test di integrazione per `AppContext` (verifica logica business dinamica per aggiunta documenti in base alla cittadinanza/età).
- **Accessibilità (A11y)**:
  - Aggiornato `Toggle.tsx`: Aggiunti `role="switch"`, `aria-checked` e associazione label corretta.
  - Aggiornato `Alert.tsx`: Aggiunto `role="alert"` per la lettura prioritaria da screen reader.

## [2.0.0-beta.1] - 2025-12-22
### Robustezza & Testing (Fase 3)
- **Type Safety**:
  - Abilitata la modalità `strict: true` in TypeScript per prevenire bug futuri.
  - Eliminate le "Magic Strings" in tutta l'applicazione introducendo costanti tipizzate (Enums) per `Citizenship` e `LicenseCategory`.
  - Aggiornato `types.ts` per derivare i tipi direttamente dalle costanti, garantendo la coerenza dei dati.
- **Testing**:
  - Aggiunta infrastruttura di test con **Vitest**.
  - Creato file di configurazione `vitest.config.ts` e `tests/setup.ts`.
  - Aggiunto primo test unitario per `useLocalStorage` per garantire la corretta persistenza dei dati.
- **Refactoring**:
  - Aggiornati `AppContext`, `ProfileSection` e tutte le guide (`MinorGuide`, `DelegateGuide`, etc.) per utilizzare le nuove costanti tipizzate invece delle stringhe hardcoded.
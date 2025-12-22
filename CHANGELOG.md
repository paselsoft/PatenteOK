
# Changelog

## [2.2.2] - 2025-12-23
### Refactoring & Fix
- **Configurazione**: Estratta la configurazione di ESLint e Prettier dal `package.json` in file dedicati (`.eslintrc.cjs` e `.prettierrc`) per una maggiore pulizia e standardizzazione del progetto.

## [2.2.1] - 2025-12-23
### UI & Configurazione
- **Categorie Patente**: Ripristinato l'elenco completo delle categorie (AM, A, B, C, D, CAP) raggruppate per tipologia nel menu a tendina.
- **UI Polish**: Ridotta ulteriormente la dimensione dei checkbox nella checklist documenti (da 24px a 20px) per una migliore armonia visiva.

## [2.2.0] - 2025-12-23
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

# PatenteOK - Gestione Pratica Patente

PatenteOK è un'applicazione web moderna e intuitiva progettata per aiutare gli aspiranti guidatori a gestire la burocrazia necessaria per l'ottenimento della patente di guida. L'interfaccia permette di monitorare i documenti necessari, gestire i pagamenti PagoPA e configurare il profilo del candidato.

## Funzionalità Principali

- **Checklist Intelligente**: Monitoraggio in tempo reale dello stato dei documenti necessari (TT2112, Certificato Medico, etc.) con aggiornamenti automatici basati sul profilo (Cittadinanza, Età).
- **Esperienza Utente Premium**:
  - **Dark Mode**: Supporto completo per tema chiaro e scuro.
  - **Animazioni Fluide**: Transizioni di pagina e feedback visivi interattivi.
  - **Confetti Celebration**: Festeggiamenti al completamento di tutti i requisiti!
- **Gestione Profilo**: Configurazione dinamica per cittadini UE/Extra-UE e minorenni.
- **Materiale Informativo**: Accesso diretto e scaricabile alla documentazione ufficiale (Tariffe, Circolari, Guide).
- **Navigazione Multipiattaforma**:
  - **Sidebar Moderna**: Menu laterale ridisegnato con icone arrotondate e stile premium.
  - **Bottom Bar (Mobile)**: Barra di navigazione inferiore stile App per un accesso rapido alle sezioni principali su smartphone.
  - **Logo Cliccabile**: Ritorno immediato alla Home.
- **Validazione Dinamica**: Sistema che legge i regolamenti dai file markdown ufficiali per applicare in tempo reale i limiti di età e mostrare avvisi contestuali.
- **Info Ufficio**: Dettagli sulla motorizzazione di riferimento e codice autoscuola.
- **Generazione Domanda**: Pulsante d'azione per finalizzare la pratica una volta completati i requisiti obbligatori.

## Tecnologie Utilizzate

- **React 19**: Core framework.
- **React Router**: Gestione della navigazione client-side.
- **Tailwind CSS**: Styling responsive e design system (inclusa Dark Mode).
- **Framer Motion**: Libreria per animazioni complesse e transizioni di pagina.
- **TypeScript**: Per garantire robustezza e type safety.
- **Vite**: Build tool e dev server ultra-veloce.
- **Vitest**: Framework di testing unitario e di integrazione.
- **GitHub Actions**: Pipeline CI per test e code quality automatici.

## Struttura del Progetto

Il progetto segue una struttura moderna basata su `src/`:

```
src/
├── components/   # Componenti UI riutilizzabili (Button, Sidebar, BottomNav...)
├── context/      # Gestione stato globale (AppContext, ToastContext)
├── hooks/        # Custom React Hooks (useLocalStorage, useLicenseRules)
├── pages/        # Componenti Pagina per il routing (HomePage, DocumentsPage...)
├── services/     # Logica di business e fetch dati
└── utils/        # Utility functions
```

## Installazione e Sviluppo

1. Clona il repository.
2. Esegui `npm install` per scaricare le dipendenze.
3. Esegui `npm run dev` per avviare il server di sviluppo locale.
4. Esegui `npm test` per lanciare la suite di test automatizzati.

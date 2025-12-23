/**
 * Servizio centralizzato per il logging degli errori.
 * In futuro può essere collegato a servizi come Sentry, LogRocket o Datadog.
 */

interface ErrorDetails {
  componentStack?: string;
  [key: string]: any;
}

export const logError = (error: Error, details?: ErrorDetails) => {
  // In ambiente di sviluppo, logga in console con formattazione
  // Fix: Property 'env' does not exist on type 'ImportMeta'. Using type assertion for Vite env.
  const isDev = (import.meta as any).env?.DEV;

  if (isDev) {
    console.group('%c[Error Service Caught Exception]', 'color: red; font-weight: bold;');
    console.error(error);
    if (details) {
      console.info('Additional Details:', details);
    }
    console.groupEnd();
  } else {
    // TODO: In produzione inviare a servizio esterno
    // Sentry.captureException(error, { extra: details });
    console.error("[App Error]:", error.message);
  }
};
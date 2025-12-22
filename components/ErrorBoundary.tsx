
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '../services/errorLogging';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Utilizza il servizio centralizzato
    logError(error, { componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-slate-200" role="alert">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">error_outline</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-2">Qualcosa è andato storto</h1>
            <p className="text-slate-600 mb-6 text-sm">
              Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Ricarica Pagina
            </button>
            {this.state.error && (
              <details className="mt-4 text-left group">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 focus:outline-none focus:underline list-none">
                  <span className="flex items-center justify-center gap-1">
                    Dettagli tecnici
                    <span className="material-symbols-outlined text-[14px] group-open:rotate-180 transition-transform">expand_more</span>
                  </span>
                </summary>
                <pre className="mt-2 text-[10px] bg-slate-100 p-2 rounded overflow-auto text-slate-700 max-h-32 font-mono border border-slate-200">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

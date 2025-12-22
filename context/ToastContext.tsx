
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastType } from '../components/ui/Toast';

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    // Utilizza crypto.randomUUID() se disponibile, altrimenti fallback su un generatore pseudo-random
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Container delle notifiche - Posizionato fisso in basso al centro/destra */}
      <div className="fixed bottom-4 left-0 right-0 flex flex-col items-center gap-2 z-[100] pointer-events-none px-4 sm:items-end sm:right-4 sm:left-auto">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

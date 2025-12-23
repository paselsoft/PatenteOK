
import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onRemove: (id: string) => void;
  duration?: number;
}

const icons = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info'
};

const styles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-orange-500 text-white',
  info: 'bg-blue-600 text-white'
};

export const Toast: React.FC<ToastProps> = ({ id, message, type, onRemove, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className={`${styles[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto`}
      role="status"
      aria-live="polite"
    >
      <span className="material-symbols-rounded text-[20px]" aria-hidden="true">{icons[type]}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={() => onRemove(id)} className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Chiudi notifica">
        <span className="material-symbols-rounded text-[18px]">close</span>
      </button>
    </div>
  );
};

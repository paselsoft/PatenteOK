
import React from 'react';

type AlertVariant = 'info' | 'warning' | 'error' | 'success';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  info: {
    container: 'bg-blue-50 border-blue-100 text-blue-900',
    icon: 'info',
    iconColor: 'text-blue-700'
  },
  warning: {
    container: 'bg-amber-50 border-amber-100 text-amber-800',
    icon: 'warning',
    iconColor: 'text-amber-600'
  },
  error: {
    container: 'bg-red-50 border-red-100 text-red-900',
    icon: 'error',
    iconColor: 'text-red-700'
  },
  success: {
    container: 'bg-green-50 border-green-100 text-green-900',
    icon: 'check_circle',
    iconColor: 'text-green-700'
  }
};

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, className = '' }) => {
  const style = variants[variant];

  return (
    <div
      className={`border rounded-lg p-3 flex gap-3 shadow-sm ${style.container} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <span className={`material-symbols-rounded shrink-0 text-[20px] mt-0.5 ${style.iconColor}`} aria-hidden="true">
        {style.icon}
      </span>
      <div className="flex flex-col gap-0.5 text-[13px] leading-relaxed">
        {title && <span className="font-bold">{title}</span>}
        <div>{children}</div>
      </div>
    </div>
  );
};

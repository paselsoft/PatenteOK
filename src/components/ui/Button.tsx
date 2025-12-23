
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  const sizeStyles = "py-2.5 px-4 text-sm";

  const variants = {
    primary: "bg-primary text-white shadow-sm hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
    outline: "border border-primary text-primary hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-rounded text-[20px]">{icon}</span>}
      {children}
    </button>
  );
};

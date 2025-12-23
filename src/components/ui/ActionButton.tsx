
import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, children, className, onClick, ...props }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-3 ${className || ''}`}
      {...props}
    >
      {icon && <span className="material-symbols-rounded text-[18px]">{icon}</span>}
      {children}
    </button>
  );
};

import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
      <div className="flex flex-col gap-0.5 max-w-[75%]">
        <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 tracking-tight">{label}</span>
        {description && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-snug">{description}</span>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-primary dark:bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
          }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
      </button>
    </div>
  );
};
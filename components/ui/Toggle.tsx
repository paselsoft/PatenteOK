import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/30">
      <div className="flex flex-col gap-0.5 max-w-[75%]">
        <span className="text-[14px] font-black text-slate-800 tracking-tight">{label}</span>
        {description && (
          <span className="text-[11px] text-slate-500 font-semibold leading-snug">{description}</span>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-primary' : 'bg-slate-200'
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
import React, { useState, useEffect } from 'react';

interface ResetConfirmationButtonProps {
    className?: string;
    label?: string;
    variant?: 'icon' | 'full';
}

export const ResetConfirmationButton: React.FC<ResetConfirmationButtonProps> = ({
    className = "",
    label = "Reset",
    variant = 'full'
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (showConfirm) {
            const timer = setTimeout(() => setShowConfirm(false), 3000); // Auto cancel after 3s
            return () => clearTimeout(timer);
        }
    }, [showConfirm]);

    const handleReset = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    };

    if (showConfirm) {
        return (
            <div className={`flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200 ${className}`}>
                <span className="text-[10px] font-bold text-red-500 whitespace-nowrap">Sei sicuro?</span>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                    title="Annulla"
                >
                    <span className="material-symbols-rounded text-lg">close</span>
                </button>
                <button
                    onClick={handleReset}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-lg shadow-red-500/30"
                    title="Conferma Reset"
                >
                    <span className="material-symbols-rounded text-lg">check</span>
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className={`${variant === 'full' ? 'flex items-center gap-2 px-3 py-2 rounded-lg' : 'w-10 h-10 rounded-full flex items-center justify-center'} transition-colors ${className}`}
            title="Reset App"
        >
            <span className="material-symbols-rounded text-lg text-red-500">delete_history</span>
            {variant === 'full' && <span className="text-sm font-medium text-red-500">{label}</span>}
        </button>
    );
};

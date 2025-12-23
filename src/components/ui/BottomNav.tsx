import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
        }`;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around h-16">
                <NavLink to="/" className={linkClass}>
                    <span className="material-symbols-rounded text-2xl">home</span>
                    <span className="text-[10px] font-medium">Home</span>
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                    <span className="material-symbols-rounded text-2xl">settings</span>
                    <span className="text-[10px] font-medium">Pratica</span>
                </NavLink>
                <NavLink to="/documents" className={linkClass}>
                    <span className="material-symbols-rounded text-2xl">description</span>
                    <span className="text-[10px] font-medium">Docs</span>
                </NavLink>
                <NavLink to="/office" className={linkClass}>
                    <span className="material-symbols-rounded text-2xl">corporate_fare</span>
                    <span className="text-[10px] font-medium">Ufficio</span>
                </NavLink>
            </div>
        </nav>
    );
};

import React from 'react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { toggleSidebar } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 py-3 flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 active:scale-90 transition-all"
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-tight leading-none text-primary">PatenteOK</h1>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Motorizzazione Siena</span>
        </div>
      </div>
      <div className="flex items-center">
        <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
          <span className="material-symbols-rounded">person</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
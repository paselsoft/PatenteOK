import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Header: React.FC = () => {
  const { toggleSidebar } = useApp();
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-4 py-3 flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-tight leading-none text-primary dark:text-blue-400">PatenteOK</h1>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Motorizzazione Siena</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-rounded font-variation-settings-fill">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 flex items-center justify-center border border-primary/20 dark:border-blue-500/30">
          <span className="material-symbols-rounded">person</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
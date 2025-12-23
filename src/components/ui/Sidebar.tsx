
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useApp();

  // Blocca lo scroll del body quando la sidebar è aperta e gestisce ESC
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          toggleSidebar();
        }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen, toggleSidebar]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-4 px-6 py-4 font-medium transition-all duration-200 rounded-xl mx-2 w-[calc(100%-16px)] text-[15px] ${isActive
      ? 'text-primary bg-primary/10 border-l-0 text-primary-dark shadow-sm'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-0 hover:shadow-sm'
    }`;

  return (
    <>
      {/* Overlay Sfondo */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-[300px] bg-white dark:bg-slate-900 z-[100] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col rounded-r-3xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Chiudi menu"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink to="/" onClick={toggleSidebar} className={linkClass}>
                <span className="material-symbols-rounded text-2xl" aria-hidden="true">home</span>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={toggleSidebar} className={linkClass}>
                <span className="material-symbols-rounded text-2xl" aria-hidden="true">settings</span>
                Pratica
              </NavLink>
            </li>
            <li>
              <NavLink to="/documents" onClick={toggleSidebar} className={linkClass}>
                <span className="material-symbols-rounded text-2xl" aria-hidden="true">description</span>
                Documenti
              </NavLink>
            </li>
            <li className="my-2 border-t border-slate-100 dark:border-slate-800 mx-6" role="separator"></li>
            <li>
              <NavLink to="/office" onClick={toggleSidebar} className={linkClass}>
                <span className="material-symbols-rounded text-2xl" aria-hidden="true">corporate_fare</span>
                Ufficio
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-br-3xl">
          <p className="text-xs text-center text-slate-400 font-medium">
            PatenteOK v2.3.0<br />© 2025
          </p>
        </div>
      </div>
    </>
  );
};

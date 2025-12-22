
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

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

  const handleNavigation = (id: string | null) => {
    toggleSidebar();
    
    // Attendi la chiusura della sidebar per fluidità (opzionale, ma consigliato per mobile)
    setTimeout(() => {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Sposta il focus sull'elemento scrollato per accessibilità
          element.setAttribute('tabindex', '-1');
          element.focus();
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

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
        className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-bold text-text-dark tracking-tight">Menu</h2>
          <button 
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="Chiudi menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
             <li>
               <button onClick={() => handleNavigation(null)} className="w-full flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary font-medium transition-colors border-l-4 border-transparent hover:border-primary text-left">
                 <span className="material-symbols-outlined" aria-hidden="true">home</span>
                 Home
               </button>
             </li>
             <li>
               <button onClick={() => handleNavigation('section-profile')} className="w-full flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary font-medium transition-colors border-l-4 border-transparent hover:border-primary text-left">
                 <span className="material-symbols-outlined" aria-hidden="true">settings</span>
                 Configurazione Pratica
               </button>
             </li>
             <li>
               <button onClick={() => handleNavigation('section-documents')} className="w-full flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary font-medium transition-colors border-l-4 border-transparent hover:border-primary text-left">
                 <span className="material-symbols-outlined" aria-hidden="true">description</span>
                 Lista Documenti
               </button>
             </li>
             <li className="my-2 border-t border-slate-100" role="separator"></li>
             <li>
               <button onClick={() => handleNavigation('section-office')} className="w-full flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary font-medium transition-colors border-l-4 border-transparent hover:border-primary text-left">
                 <span className="material-symbols-outlined" aria-hidden="true">corporate_fare</span>
                 Info Ufficio
               </button>
             </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-center text-slate-400">
            PatenteOK v2.1.0-beta.2<br/>© 2025
          </p>
        </div>
      </div>
    </>
  );
};

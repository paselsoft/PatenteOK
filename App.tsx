import React from 'react';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import DocumentList from './components/DocumentList';
import OfficeInfo from './components/OfficeInfo';
import Footer from './components/Footer';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { documents } = useApp();
  
  const completedCount = documents.filter(d => d.completed).length;
  const progressPercent = documents.length > 0 ? (completedCount / documents.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-8 pb-32">
        {/* STATO DELLA DOMANDA (Screenshot 1) */}
        <div className="bg-white rounded-3xl p-6 flex items-center justify-between border border-slate-200 card-shadow">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Stato della Domanda</span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {progressPercent === 100 ? "Pratica completata ✨" : "Documenti mancanti"}
            </h2>
          </div>
          <div className="relative h-16 w-16 flex items-center justify-center">
            <svg className="h-16 w-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
              <circle 
                cx="32" 
                cy="32" 
                r="28" 
                stroke="currentColor" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray={175.9} 
                strokeDashoffset={175.9 - (175.9 * progressPercent) / 100} 
                strokeLinecap="round" 
                className="text-primary transition-all duration-1000 ease-out" 
              />
            </svg>
            <span className="absolute text-[13px] font-black text-slate-800">{Math.round(progressPercent)}%</span>
          </div>
        </div>

        {/* CONFIGURAZIONE PRATICA (Screenshot 1) */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-slate-800 px-1 tracking-tight">Configurazione Pratica</h3>
          <ProfileSection />
        </section>

        {/* CHECKLIST DOCUMENTI (Screenshot 2 & 3) */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-slate-800 px-1 tracking-tight">Checklist Documenti</h3>
          <DocumentList />
        </section>
        
        {/* INFO UFFICIO (Screenshot 4) */}
        <OfficeInfo />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
import React from 'react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/PageTransition';
import { Confetti } from '../components/Confetti';
import { Alert } from '../components/ui/Alert';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { documents } = useApp();

    const completedCount = documents.filter(d => d.completed).length;
    const progressPercent = documents.length > 0 ? (completedCount / documents.length) * 100 : 0;

    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-8 pb-32">
            <Confetti trigger={progressPercent === 100} />

            <Alert variant="info" title="Avviso Importante">
                Per accedere allo sportello patenti della Motorizzazione Civile di Siena, è necessario prendere l'appuntamento su <a href="https://3327.easybook.cloud/#step-1" target="_blank" className="font-bold underline">questo portale</a>.
            </Alert>

            {/* STATO DELLA DOMANDA */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 flex items-center justify-between border border-slate-200 dark:border-slate-800 card-shadow transition-colors">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stato della Domanda</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                        {progressPercent === 100 ? "Pratica completata ✨" : "Documenti mancanti"}
                    </h2>
                </div>
                <div className="relative h-16 w-16 flex items-center justify-center">
                    <svg className="h-16 w-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800" />
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
                    <span className="absolute text-[13px] font-black text-slate-800 dark:text-slate-100">{Math.round(progressPercent)}%</span>
                </div>
            </div>

            {/* Quick Actions / Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/profile" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-rounded">settings</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Configura</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Imposta cittadinanza, età e dettagli della pratica.</p>
                </Link>

                <Link to="/documents" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-rounded">description</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Documenti</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gestisci la checklist e scarica i moduli.</p>
                </Link>

                <Link to="/office" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-rounded">corporate_fare</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Ufficio</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Orari, contatti e prenotazioni.</p>
                </Link>
            </div>

        </PageTransition>
    );
};

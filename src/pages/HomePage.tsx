import React from 'react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/PageTransition';
import { Confetti } from '../components/Confetti';
import { Alert } from '../components/ui/Alert';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { documents, isReadyToSubmit, profile } = useApp();

    const completedCount = documents.filter(d => d.completed).length;
    const progressPercent = documents.length > 0 ? (completedCount / documents.length) * 100 : 0;

    // Logic for completion states
    // Step 1 is "done" if we have started working on documents (implied configuration done)
    const isStep1Complete = progressPercent > 0;
    const isStep2Complete = isReadyToSubmit;
    const isStep3Ready = isReadyToSubmit;
    const isAppointmentBooked = profile?.isAppointmentBooked;

    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-8 pb-32">
            <Confetti trigger={progressPercent === 100} />

            <Alert variant="info" title="Accesso allo Sportello">
                Non prenotare ancora! Prima prepariamo insieme i documenti, poi ti daremo il link per l'appuntamento.
            </Alert>

            {/* STATO DELLA DOMANDA */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 flex items-center justify-between border border-slate-200 dark:border-slate-800 card-shadow transition-colors">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stato della Domanda</span>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                        {progressPercent === 0 ? "Pratica da iniziare" : progressPercent === 100 ? "Pratica completata ✨" : "Stiamo procedendo..."}
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

            {/* Quick Actions / Navigation Cards with Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* STEP 1: CHI PRESENTA LA DOMANDA */}
                <Link to="/profile" className={`p-6 rounded-3xl border card-shadow hover:shadow-lg transition-all group relative overflow-hidden ${isStep1Complete ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-2xl transition-colors ${isStep1Complete ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${isStep1Complete ? 'text-green-600 dark:text-green-400' : 'text-primary dark:text-blue-400'}`}>
                            {isStep1Complete && <span className="material-symbols-rounded text-[14px]">check</span>}
                            {isStep1Complete ? 'Fatto' : 'Passo 1'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isStep1Complete ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400'}`}>
                            <span className="material-symbols-rounded">person_edit</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Chi presenta la domanda?</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Specifica età e cittadinanza per capire esattamente cosa ti serve.</p>
                </Link>

                {/* STEP 2: PREPARA DOCUMENTI */}
                <Link to="/documents" className={`p-6 rounded-3xl border card-shadow hover:shadow-lg transition-all group relative overflow-hidden ${isStep2Complete ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-2xl transition-colors ${isStep2Complete ? 'bg-green-100 dark:bg-green-900/30' : 'bg-emerald-50 dark:bg-emerald-900/20'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${isStep2Complete ? 'text-green-600 dark:text-green-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {isStep2Complete && <span className="material-symbols-rounded text-[14px]">check</span>}
                            {isStep2Complete ? 'Pronto' : 'Passo 2'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isStep2Complete ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                            <span className="material-symbols-rounded">description</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Raccolta Documenti</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Segui la tua checklist personalizzata, scarica i moduli e leggi le guide.</p>
                </Link>

                {/* STEP 3: UFFICIO & APPUNTAMENTO */}
                <Link to="/office" className={`p-6 rounded-3xl border card-shadow hover:shadow-lg transition-all group relative overflow-hidden md:col-span-2 ${isAppointmentBooked
                    ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900'
                    : isStep3Ready
                        ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}>
                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-2xl transition-colors ${isAppointmentBooked
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-purple-50 dark:bg-purple-900/20'
                        }`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${isAppointmentBooked
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                            }`}>
                            {isAppointmentBooked
                                ? <><span className="material-symbols-rounded text-[14px]">event_available</span> Confermata</>
                                : isStep3Ready
                                    ? <><span className="material-symbols-rounded text-[14px] animate-pulse">event</span> Puoi Prenotare</>
                                    : 'Passo 3'
                            }
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isAppointmentBooked
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                            }`}>
                            <span className="material-symbols-rounded">corporate_fare</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Consegna allo Sportello</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isAppointmentBooked ? 'Ottimo! Ricordati di portare tutti i documenti originali.' : 'Tutto pronto? Scopri orari e modalità per consegnare la pratica.'}
                    </p>
                </Link>
            </div>

        </PageTransition>
    );
};

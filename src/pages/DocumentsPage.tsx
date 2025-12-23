import React from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/DocumentList';
import { PageTransition } from '../components/PageTransition';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export const DocumentsPage: React.FC = () => {
    const navigate = useNavigate();
    const { isReadyToSubmit } = useApp();

    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-10 pb-32">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Checklist Documenti</h1>
                <p className="text-slate-600 dark:text-slate-400">Tieni traccia di tutto ciò che serve per la tua patente.</p>
            </div>

            <section>
                <DocumentList />
            </section>

            <section className="mt-4">
                <Button
                    onClick={() => navigate('/office')}
                    icon="calendar_month"
                    fullWidth
                    variant={isReadyToSubmit ? 'primary' : 'secondary'}
                    className={`h-14 text-lg shadow-xl ${isReadyToSubmit ? 'shadow-blue-500/30' : ''}`}
                >
                    {isReadyToSubmit ? 'Tutto Pronto: Prenota Appuntamento' : 'Completa la Checklist per Procedere'}
                </Button>
                {!isReadyToSubmit && (
                    <p className="text-center text-xs text-slate-400 mt-3">
                        Assicurati di avere tutti i documenti spuntati prima di prendere appuntamento.
                    </p>
                )}
            </section>
        </PageTransition>
    );
};

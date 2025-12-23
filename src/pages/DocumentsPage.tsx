import React from 'react';
import DocumentList from '../components/DocumentList';
import { PageTransition } from '../components/PageTransition';

export const DocumentsPage: React.FC = () => {
    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-10 pb-32">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Checklist Documenti</h1>
                <p className="text-slate-600 dark:text-slate-400">Tieni traccia di tutto ciò che serve per la tua patente.</p>
            </div>

            <section>
                <DocumentList />
            </section>

            {/* <section>
                <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 px-1">Risorse Utili</h2>
                <ResourcesList />
            </section> */}
        </PageTransition>
    );
};

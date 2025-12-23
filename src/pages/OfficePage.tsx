import React from 'react';
import OfficeInfo from '../components/OfficeInfo';
import { PageTransition } from '../components/PageTransition';

export const OfficePage: React.FC = () => {
    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-32">
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">Info Ufficio</h1>
            <OfficeInfo />
        </PageTransition>
    );
};

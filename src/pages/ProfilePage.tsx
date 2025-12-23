import React from 'react';
import ProfileSection from '../components/ProfileSection';
import { PageTransition } from '../components/PageTransition';

export const ProfilePage: React.FC = () => {
    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-32">
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">Configurazione Pratica</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Personalizza la tua esperienza in base alle tue necessità.</p>
            <ProfileSection />
        </PageTransition>
    );
};

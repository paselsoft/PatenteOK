import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../components/ProfileSection';
import { PageTransition } from '../components/PageTransition';
import { Button } from '../components/ui/Button';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageTransition className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-32">
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">Configurazione Pratica</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Personalizza la tua esperienza in base alle tue necessità.</p>

            <ProfileSection />

            <div className="mt-8">
                <Button
                    onClick={() => navigate('/documents')}
                    icon="arrow_forward"
                    fullWidth
                    className="h-12 text-base shadow-lg shadow-blue-500/20"
                >
                    Salva e Vai ai Documenti
                </Button>
            </div>
        </PageTransition>
    );
};

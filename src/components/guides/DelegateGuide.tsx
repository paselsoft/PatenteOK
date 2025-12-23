
import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';
import { CITIZENSHIP } from '../../types';

interface DelegateGuideProps {
  onComplete: () => void;
  citizenship?: string;
}

export const DelegateGuide: React.FC<DelegateGuideProps> = ({ onComplete, citizenship }) => {
  return (
    <GuideContainer>
      <div className="bg-orange-50 text-orange-800 text-xs p-3 rounded-lg border border-orange-100 mb-2">
        <strong>Circolare 1254/M352:</strong> La delega è permessa solo a titolo gratuito e occasionale (eccetto Autoscuole).
      </div>

      <GuideStep number="1" title="Delega e Firma" colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <p className="text-xs text-secondary-text leading-relaxed">
          Il candidato deve:
        </p>
        <ul className="text-xs text-secondary-text space-y-1 list-disc pl-4 mt-1">
          <li>Firmare il modulo TT2112 preventivamente.</li>
          <li>Compilare una delega in carta semplice.</li>
          <li>Fornire fotocopia del proprio documento d'identità.</li>
        </ul>
      </GuideStep>

      <GuideStep number="2" title="Checklist per il Delegato" isLast colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <p className="text-xs text-secondary-text mb-1">Cosa portare allo sportello:</p>
        <ul className="text-xs text-secondary-text space-y-1.5 list-disc pl-4 border-l-2 border-slate-100 ml-1">
          <li>Domanda TT2112 firmata dal candidato.</li>
          <li>Delega firmata.</li>
          <li>Fotocopia documento del candidato.</li>
          <li>Documento d'identità del delegato.</li>
          {citizenship === CITIZENSHIP.EXTRA_EU && (
            <li className="text-orange-700 font-medium bg-orange-50 px-1 rounded">
               Permesso di Soggiorno (copia conforme).
            </li>
          )}
          <li>Ricevute versamenti PagoPA (originali).</li>
        </ul>

        <div className="mt-3">
           <Button onClick={onComplete} icon="assignment_turned_in" fullWidth>
             Ho tutto il materiale pronto
           </Button>
        </div>
      </GuideStep>
    </GuideContainer>
  );
};

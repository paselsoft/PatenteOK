
import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';

interface IdentityGuideProps {
  onComplete: () => void;
}

export const IdentityGuide: React.FC<IdentityGuideProps> = ({ onComplete }) => {
  return (
    <GuideContainer>
      {/* Intro Section */}
      <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <span className="material-symbols-rounded text-primary text-[24px] mt-0.5">badge</span>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-secondary-text leading-relaxed">
            Il documento di riconoscimento è fondamentale per presentare la domanda e per farsi identificare ad ogni prova d'esame. Deve essere <strong>valido</strong> (non scaduto) e <strong>integro</strong>.
          </p>
        </div>
      </div>

      <GuideStep number="1" title="Documento Principale">
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm mt-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="material-symbols-rounded text-[18px] text-primary">id_card</span>
            <span className="text-sm font-bold text-text-dark">Carta d'Identità</span>
          </div>
          <p className="text-xs text-secondary-text leading-snug mb-2">
            Valida sia cartacea che elettronica (CIE).
          </p>
          <div className="bg-blue-50 text-[11px] text-blue-900 p-2 rounded border border-blue-100 flex gap-2 items-start">
            <span className="material-symbols-rounded text-[14px] mt-0.5">info</span>
            <span>
              <strong>Ricevuta CIE:</strong> È valida come documento di riconoscimento (Circolare 9/2019). L'autenticità è verificabile tramite scansione del QR Code con l'app <strong>Ve.DO</strong>.
            </span>
          </div>
        </div>
      </GuideStep>

      <GuideStep number="2" title="Documenti Equipollenti" colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <p className="text-xs text-secondary-text mb-2">
          Se non hai la C.I., sono validi anche questi documenti (purché con foto e timbro statale):
        </p>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-secondary-text font-medium">
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Passaporto
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Patente (guida/nautica)
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Porto d'Armi
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Libretto Pensione
          </div>
          <div className="col-span-2 flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Patentino Termici (con foto)
          </div>
          <div className="col-span-2 flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
            <span className="material-symbols-rounded text-[16px]">check</span> Tessere Statali (Mod. AT/BT)
          </div>
        </div>
      </GuideStep>

      <GuideStep number="3" title="Cittadini Stranieri" colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <div className="flex flex-col gap-2 mt-1">
          <div className="border-l-2 border-blue-400 pl-3">
            <strong className="text-xs block text-text-dark">UE / SEE</strong>
            <p className="text-[11px] text-secondary-text">
              Validi anche Carta d'Identità o Passaporto del Paese d'origine.
            </p>
          </div>
          <div className="border-l-2 border-indigo-400 pl-3">
            <strong className="text-xs block text-text-dark">Extra-UE</strong>
            <p className="text-[11px] text-secondary-text">
              Identificazione tramite <strong>Passaporto</strong>.
              <br />
              <span className="italic text-slate-500">Nota: Il Permesso di Soggiorno attesta la regolarità, il Passaporto è necessario per l'identificazione.</span>
            </p>
          </div>
        </div>
      </GuideStep>

      <GuideStep number="!" title="Requisiti Essenziali" isLast colorClass="bg-yellow-100 text-yellow-700 border-yellow-200">
        <ul className="list-disc pl-4 text-xs text-secondary-text space-y-1 mt-1">
          <li><strong>Validità:</strong> Documento non scaduto.</li>
          <li><strong>Integrità:</strong> Leggibile in ogni parte.</li>
          <li><strong>Foto:</strong> Riconoscimento chiaro del viso.</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex flex-col gap-1 mt-3">
          <strong className="text-xs text-yellow-900 flex items-center gap-1">
            <span className="material-symbols-rounded text-[16px]">warning</span>
            Attenzione per la Delega
          </strong>
          <p className="text-[11px] text-yellow-800 leading-snug">
            Se incarichi qualcun altro, devi fornirgli una <strong>fotocopia fronte-retro</strong> del tuo documento per validare la firma.
          </p>
        </div>

        <div className="mt-3">
          <Button onClick={onComplete} icon="verified_user" fullWidth>
            Ho verificato i documenti
          </Button>
        </div>
      </GuideStep>
    </GuideContainer>
  );
};

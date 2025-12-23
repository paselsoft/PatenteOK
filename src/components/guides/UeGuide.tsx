
import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';

interface UeGuideProps {
  onComplete: () => void;
}

export const UeGuide: React.FC<UeGuideProps> = ({ onComplete }) => {
  return (
    <GuideContainer>
      <div className="bg-blue-50 text-blue-900 text-xs p-3 rounded-lg border border-blue-100">
        I cittadini UE/SEE godono di procedure agevolate per la dimostrazione della residenza e l'uso delle autocertificazioni.
      </div>

      <GuideStep number="1" title="Il Requisito della Residenza" colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <div className="text-xs text-secondary-text leading-relaxed space-y-2">
          <p>Per conseguire la patente in Italia devi trovarti in una di queste situazioni:</p>
          <ul className="space-y-1.5 list-disc pl-4 mt-1">
            <li>
              <strong className="text-text-dark">Residenza Anagrafica:</strong> Iscritto all'anagrafe di un comune italiano.
            </li>
            <li>
              <strong className="text-text-dark">Residenza Normale:</strong> Dimora abituale in Italia per almeno <strong>185 giorni/anno</strong> per interessi personali/professionali, o qualifica di <strong>studente</strong> in Italia (da almeno 6 mesi).
            </li>
          </ul>
        </div>
      </GuideStep>

      <GuideStep number="2" title="Documenti di Riconoscimento">
        <p className="text-xs text-secondary-text mb-1">Puoi identificarti con:</p>
        <ul className="text-xs text-secondary-text space-y-1 list-disc pl-4">
          <li>Carta d'identità italiana (se residente).</li>
          <li>Documento valido del tuo Paese d'origine (Passaporto o Carta d'Identità UE) se hai solo la residenza normale.</li>
        </ul>
      </GuideStep>

      <GuideStep number="3" title="Checklist Documenti" isLast colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <ul className="text-xs text-secondary-text space-y-1.5 list-disc pl-4 border-l-2 border-slate-100 ml-1">
          <li>Domanda TT2112.</li>
          <li>Ricevute Versamenti PagoPA.</li>
          <li>Ricevuta Certificato Medico dematerializzato.</li>
          <li>Fotocopia Documento d'identità (Italiano o UE).</li>
          <li className="bg-slate-50 p-1 rounded -ml-1 pl-1">
            <strong>Solo per Residenza Normale:</strong> Dichiarazione sostitutiva di atto di notorietà che attesta la dimora o lo status di studente.
          </li>
        </ul>

        <div className="mt-3 flex gap-2 items-start bg-green-50 p-2.5 rounded border border-green-100">
          <span className="material-symbols-rounded text-green-700 text-[18px] shrink-0">verified</span>
          <div className="text-[11px] text-green-900 leading-snug">
            <strong>Vantaggio UE:</strong> Puoi usare pienamente l'autocertificazione per comprovare stati e qualità personali, equiparandoti ai cittadini italiani.
          </div>
        </div>

        <div className="mt-3">
          <Button onClick={onComplete} icon="done_all" fullWidth>
            Ho verificato i requisiti UE
          </Button>
        </div>
      </GuideStep>
    </GuideContainer>
  );
};

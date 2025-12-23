
import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';

interface MedicalGuideProps {
  onComplete: () => void;
}

export const MedicalGuide: React.FC<MedicalGuideProps> = ({ onComplete }) => {
  return (
    <GuideContainer>
      <GuideStep number="1" title="Certificato Anamnestico (Preliminare)">
        <p className="text-xs text-secondary-text leading-relaxed">
          Recati dal tuo <strong>Medico di Famiglia</strong>. Il certificato attesta le malattie rilevanti per la guida.
        </p>
        <div className="bg-yellow-50 text-yellow-800 text-[11px] p-2 rounded mt-1 border border-yellow-100">
          <strong>Nota:</strong> Questo certificato è a pagamento e va consegnato al medico che farà la visita successiva.
        </div>
      </GuideStep>

      <GuideStep number="2" title="Scegli il Medico Accertatore">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-primary">
              <span className="material-symbols-rounded text-[18px]">person</span>
              <span className="text-xs font-bold uppercase">Standard</span>
            </div>
            <p className="text-[11px] text-secondary-text leading-snug">
              Se sei in buona salute: Medico ASL, Militare, o presso Autoscuola/Agenzia.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-orange-600">
              <span className="material-symbols-rounded text-[18px]">local_hospital</span>
              <span className="text-xs font-bold uppercase">Commissione (CML)</span>
            </div>
            <p className="text-[11px] text-secondary-text leading-snug">
              In caso di disabilità, problemi vista gravi, diabete complesso o se richiesto.
            </p>
          </div>
        </div>
      </GuideStep>

      <GuideStep number="3" title="Cosa portare alla visita">
        <ul className="text-xs text-secondary-text space-y-1.5 list-disc pl-4">
          <li>Certificato Anamnestico (del medico di famiglia).</li>
          <li>Documento d'identità valido.</li>
          <li>Ricevuta versamento <strong>€16,00</strong> (c/c 4028).</li>
          <li>Eventuali certificati specialistici.</li>
        </ul>
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mt-2 flex gap-3 items-start">
          <span className="material-symbols-rounded text-primary text-[20px] shrink-0">photo_camera</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-primary">Attenzione alla Foto</span>
            <p className="text-[11px] text-slate-600 leading-snug">
              Non servono fototessere cartacee. Il medico scatterà una foto digitale e acquisirà la firma su tavoletta per inviarle telematicamente.
            </p>
          </div>
        </div>
      </GuideStep>

      <GuideStep number="4" title="Ricevuta Dematerializzata" isLast colorClass="bg-green-100 text-green-700 border-green-200">
        <p className="text-xs text-secondary-text leading-relaxed mb-3">
          Se idoneo, il medico invia il certificato al Ministero e ti rilascia una <strong>ricevuta cartacea con codice a barre</strong>. Questa va allegata alla domanda TT2112.
        </p>
        <div className="mt-3">
          <Button onClick={onComplete} icon="check_circle" fullWidth>
            Ho la Ricevuta Dematerializzata
          </Button>
        </div>
      </GuideStep>
    </GuideContainer>
  );
};


import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';

interface ExtraUeGuideProps {
  onComplete: () => void;
}

export const ExtraUeGuide: React.FC<ExtraUeGuideProps> = ({ onComplete }) => {
  return (
    <GuideContainer>
      <GuideStep number="1" title="Requisiti Preliminari" colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <div className="text-xs text-secondary-text leading-relaxed space-y-2">
          <p>Per presentare la domanda sono necessarie due condizioni:</p>
          <ul className="space-y-1 list-disc pl-4">
            <li><strong>Residenza Anagrafica</strong> in Italia (non basta il domicilio o la "residenza normale").</li>
            <li><strong>Soggiorno Regolare</strong> sul territorio italiano.</li>
          </ul>
        </div>
      </GuideStep>

      <GuideStep number="2" title="Documenti di Soggiorno">
        <p className="text-xs text-secondary-text mb-1">Devi esibire in originale e copia uno di questi:</p>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-2 mt-1">
          <div className="flex items-start gap-2">
            <span className="material-symbols-rounded text-[16px] text-green-600 mt-0.5">check_circle</span>
            <span className="text-secondary-text"><strong>Permesso di Soggiorno</strong> (Originale + Fotocopia)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-rounded text-[16px] text-green-600 mt-0.5">check_circle</span>
            <span className="text-secondary-text"><strong>Permesso Soggiornanti Lungo Periodo</strong> UE</span>
          </div>

          {/* Section Ricevute */}
          <div className="flex items-start gap-2 bg-blue-50 p-2 rounded border border-blue-100 mt-2">
            <span className="material-symbols-rounded text-[16px] text-blue-600 mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-blue-900">Validità Ricevute (Circolari MIT):</span>
              <span className="text-[11px] text-blue-800 leading-snug">
                Sono valide le ricevute postali/Questura di <strong>primo rilascio</strong> o <strong>rinnovo</strong> (Mod. 22AO).
                <br />
                <span className="italic opacity-80">La ricevuta Mod. 22AO ha validità di 9 mesi dall'accettazione.</span>
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 mt-2">
            <p className="text-[11px] text-secondary-text font-medium mb-1">
              <span className="material-symbols-rounded text-[14px] align-bottom mr-1">child_care</span>
              Obbligatorio anche per candidati minorenni.
            </p>
            <p className="text-[11px] text-secondary-text">
              <span className="material-symbols-rounded text-[14px] align-bottom mr-1">volunteer_activism</span>
              <strong>Richiedenti Asilo/Umanitari:</strong> Devono comprovare l'acquisizione della residenza in Italia.
            </p>
          </div>
        </div>
      </GuideStep>

      <GuideStep number="!" title="Attenzione: Discordanza Nomi" colorClass="bg-yellow-100 text-yellow-700 border-yellow-200">
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-[11px] text-yellow-900 leading-relaxed mt-1">
          Spesso ci sono differenze (ordine cognomi, translitterazione) tra Passaporto, Permesso di Soggiorno e Carta d'Identità.
          <br /><br />
          <strong>Regola:</strong> I dati devono coincidere. Se diversi, l'Ufficio Motorizzazione richiederà la <strong>rettifica anagrafica</strong> in Questura/Comune prima di accettare la pratica.
        </div>
      </GuideStep>

      <GuideStep number="3" title="Autocertificazione" isLast colorClass="bg-slate-100 text-slate-600 border-slate-200">
        <p className="text-xs text-secondary-text leading-relaxed mb-3">
          L'autocertificazione è valida <strong>solo</strong> per dati verificabili dalla Pubblica Amministrazione italiana (es. residenza).
        </p>
        <p className="text-xs text-secondary-text leading-relaxed mb-3">
          Dati familiari o fatti avvenuti all'estero richiedono certificati originali tradotti e legalizzati.
        </p>

        <div className="mt-3">
          <Button onClick={onComplete} icon="done_all" fullWidth>
            Ho verificato i requisiti
          </Button>
        </div>
      </GuideStep>
    </GuideContainer>
  );
};


import React from 'react';
import { GuideStep } from '../ui/GuideStep';
import { Button } from '../ui/Button';
import { GuideContainer } from '../ui/GuideContainer';
import { CITIZENSHIP, LICENSE_CATEGORIES } from '../../types';

interface MinorGuideProps {
   onComplete: () => void;
   citizenship?: string;
   licenseCategory?: string;
}

export const MinorGuide: React.FC<MinorGuideProps> = ({ onComplete, citizenship, licenseCategory }) => {
   return (
      <GuideContainer>
         <div className="bg-amber-50 text-amber-900 text-xs p-3 rounded-lg border border-amber-100">
            Per i candidati under 18, la procedura amministrativa richiede <strong>obbligatoriamente</strong> l'intervento di un genitore o tutore legale.
         </div>

         <GuideStep number="1" title="Regole Comuni (Per tutti)" colorClass="bg-slate-100 text-slate-600 border-slate-200">
            <div className="text-xs text-secondary-text leading-relaxed space-y-2">
               <ul className="space-y-1.5 list-disc pl-4 mt-1">
                  <li><strong>Firma Genitore:</strong> Il modello TT2112 deve essere firmato sia dal candidato che da un genitore (o tutore).</li>
                  <li><strong>Documento Genitore:</strong> Allegare sempre fotocopia fronte-retro del documento del genitore che ha firmato.</li>
                  <li><strong>Visita Medica:</strong> Foto e firma del minore vengono acquisite digitalmente dal medico.</li>
               </ul>
            </div>
         </GuideStep>

         {licenseCategory === LICENSE_CATEGORIES.AM && (
            <GuideStep number="!" title="Speciale Patente AM (Ciclomotore)" colorClass="bg-orange-100 text-orange-700 border-orange-200">
               <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-[11px] text-orange-900 leading-relaxed mt-1">
                  A <strong>pagina 4</strong> del modello TT2112 (spazio "Note") è obbligatorio indicare:
                  <ol className="list-decimal pl-4 mt-1 space-y-0.5">
                     <li>Tipo di veicolo per l'esame (2 ruote, 3 ruote o quadriciclo).</li>
                     <li>Tipo di cambio (manuale o automatico).</li>
                  </ol>
                  <div className="mt-2 font-bold">
                     Questa nota deve essere firmata sia dal candidato che dal genitore!
                  </div>
               </div>
            </GuideStep>
         )}

         <GuideStep number={licenseCategory === LICENSE_CATEGORIES.AM ? "2" : "2"} title="Specifiche per Cittadinanza">
            {citizenship === CITIZENSHIP.ITALIAN && (
               <div className="text-xs text-secondary-text bg-slate-50 p-3 rounded border border-slate-200 mt-1">
                  <strong className="block text-text-dark mb-1">🇮🇹 Cittadino Italiano</strong>
                  <ul className="list-disc pl-4 space-y-1">
                     <li>Carta d'identità italiana (originale + fotocopia).</li>
                     <li>Residenza verificata tramite documento o autocertificazione.</li>
                  </ul>
               </div>
            )}

            {citizenship === CITIZENSHIP.EU && (
               <div className="text-xs text-secondary-text bg-slate-50 p-3 rounded border border-slate-200 mt-1">
                  <strong className="block text-text-dark mb-1">🇪🇺 Cittadino UE / SEE</strong>
                  <ul className="list-disc pl-4 space-y-1">
                     <li>Carta d'Identità o Passaporto paese d'origine.</li>
                     <li>
                        Se senza residenza anagrafica: dimostrare "Residenza Normale" (es. scuola in Italia) con <strong>dichiarazione sostitutiva</strong> firmata dal genitore.
                     </li>
                  </ul>
               </div>
            )}

            {citizenship === CITIZENSHIP.EXTRA_EU && (
               <div className="text-xs text-secondary-text bg-slate-50 p-3 rounded border border-slate-200 mt-1">
                  <strong className="block text-text-dark mb-1">🌍 Cittadino Extra-UE</strong>
                  <ul className="list-disc pl-4 space-y-1">
                     <li>Passaporto valido paese d'origine.</li>
                     <li>
                        <strong>Permesso di Soggiorno del minore</strong> (o ricevuta rinnovo/rilascio). È obbligatorio.
                     </li>
                     <li>Residenza anagrafica in Italia necessaria.</li>
                  </ul>
               </div>
            )}
         </GuideStep>

         <GuideStep number={licenseCategory === LICENSE_CATEGORIES.AM ? "3" : "3"} title="Checklist Documenti Minore" isLast colorClass="bg-slate-100 text-slate-600 border-slate-200">
            <ul className="text-xs text-secondary-text space-y-1.5 list-disc pl-4 border-l-2 border-slate-100 ml-1">
               <li>Modulo TT2112 (Firma Minore + Firma Genitore).</li>
               {licenseCategory === LICENSE_CATEGORIES.AM && <li className="text-orange-700 font-medium">Nota pag.4 veicolo/cambio (Doppia Firma).</li>}
               <li>Versamenti PagoPA (€ 26,40 + € 16,00 + € 16,00).</li>
               <li>Ricevuta Certificato Medico.</li>
               <li>Documento Minore (Copia).</li>
               <li><strong>Documento Genitore firmatario</strong> (Copia).</li>
               <li>Codice Fiscale (Tessera Sanitaria).</li>
               {citizenship === CITIZENSHIP.EXTRA_EU && <li>Permesso Soggiorno Minore (Originale + Copia).</li>}
            </ul>

            <div className="mt-3">
               <Button onClick={onComplete} icon="family_restroom" fullWidth>
                  Requisiti Minorenni Verificati
               </Button>
            </div>
         </GuideStep>
      </GuideContainer>
   );
};

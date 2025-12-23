import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DOCUMENT_IDS } from '../constants';

const DocumentList: React.FC = () => {
  const { documents, toggleDocument } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDocument(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {documents.map((doc) => {
        const isExpanded = expandedId === doc.id;

        return (
          <div
            key={doc.id}
            className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow transition-all ${isExpanded ? 'ring-2 ring-primary dark:ring-blue-500 ring-inset' : ''}`}
          >
            <div
              className="p-5 flex items-center gap-4 cursor-pointer"
              onClick={() => doc.expandable && setExpandedId(isExpanded ? null : doc.id)}
            >
              {/* Check indicator ridimensionato a w-5 h-5 (20px) */}
              <button
                onClick={(e) => handleToggle(doc.id, e)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${doc.completed ? 'bg-primary dark:bg-blue-600 border-primary dark:border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
              >
                <span className="material-symbols-rounded font-black text-xs">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <h4 className={`text-[15px] font-black tracking-tight ${doc.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                  {doc.title}
                </h4>
                <p className="text-[13px] text-slate-500 font-medium">{doc.subtitle}</p>
              </div>

              {doc.expandable && (
                <span className={`material-symbols-rounded text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              )}
            </div>

            {/* Sub-content per TT2112 */}
            {doc.id === DOCUMENT_IDS.TT2112 && !doc.completed && (
              <div className="px-5 pb-6 pt-0">
                <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-rounded text-orange-500 text-xl">warning</span>
                    <p className="text-[13px] font-black text-orange-800 leading-snug">
                      Importante: Stampare su fogli singoli (NON fronte/retro).
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-primary text-[13px] font-black hover:underline px-1">
                    <span className="material-symbols-rounded text-lg">download</span>
                    Scarica Modulo PDF
                  </button>
                </div>
              </div>
            )}

            {/* Guide espanse */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-2">
                    <div className="flex flex-col gap-6 border-t border-slate-100 pt-6">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3">
                        <span className="material-symbols-rounded text-primary font-bold">badge</span>
                        <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">
                          Il documento di riconoscimento è fondamentale per presentare la domanda. Deve essere <span className="text-slate-900 font-black">valido</span> e <span className="text-slate-900 font-black">integro</span>.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-primary border border-blue-200 flex items-center justify-center font-black text-xs">1</div>
                          <div className="w-0.5 bg-slate-200 h-full my-1"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2">Documento Principale</p>
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 card-shadow">
                            <div className="flex items-center gap-3 mb-2 text-primary font-black">
                              <span className="material-symbols-rounded">id_card</span>
                              <span className="text-sm">Carta d'Identità</span>
                            </div>
                            <p className="text-[12px] text-slate-500 font-medium mb-3">Valida sia cartacea che elettronica (CIE).</p>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
                              <span className="text-blue-900 font-black text-[11px] leading-snug">
                                <span className="font-black text-primary">CIE in fase di rilascio:</span> È valida anche la ricevuta cartacea del rilascio.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleToggle(doc.id, e)}
                        className="w-full bg-primary text-white py-4 rounded-xl font-black text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
                      >
                        <span className="material-symbols-rounded fill-icon">verified_user</span>
                        Ho verificato i documenti
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentList;
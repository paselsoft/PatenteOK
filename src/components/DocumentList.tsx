import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DOCUMENT_IDS } from '../constants';

// Guides
import { IdentityGuide } from './guides/IdentityGuide';
import { MedicalGuide } from './guides/MedicalGuide';
import { UeGuide } from './guides/UeGuide';
import { ExtraUeGuide } from './guides/ExtraUeGuide';
import { DelegateGuide } from './guides/DelegateGuide';
import { MinorGuide } from './guides/MinorGuide';

const DocumentList: React.FC = () => {
  const { documents, toggleDocument, profile } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDocument(id);
  };

  const renderGuide = (docId: string, handleComplete: () => void) => {
    switch (docId) {
      case DOCUMENT_IDS.IDENTITY_DOCS:
        return <IdentityGuide onComplete={handleComplete} />;
      case DOCUMENT_IDS.MEDICAL_CERT:
        return <MedicalGuide onComplete={handleComplete} />;
      case DOCUMENT_IDS.UE_GUIDE:
        return <UeGuide onComplete={handleComplete} />;
      case DOCUMENT_IDS.EXTRA_UE_GUIDE:
        return <ExtraUeGuide onComplete={handleComplete} />;
      case DOCUMENT_IDS.DELEGATE_KIT:
        return <DelegateGuide onComplete={handleComplete} />;
      case DOCUMENT_IDS.MINOR_GUIDE:
        return (
          <MinorGuide
            onComplete={handleComplete}
            citizenship={profile.citizenship}
            licenseCategory={profile.licenseCategory}
          />
        );
      default:
        // Fallback generico per documenti senza guida specifica (es. Bollettini se non hanno guida)
        return null;
    }
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

            {/* Sub-content per PagoPA */}
            {doc.id === DOCUMENT_IDS.PAGOPA && !doc.completed && (
              <div className="px-5 pb-6 pt-0">
                <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-3">
                  {doc.warningText && (
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-rounded text-orange-500 text-xl">warning</span>
                      <p className="text-[13px] font-black text-orange-800 leading-snug">
                        {doc.warningText}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 mt-1">
                    {/* Link Portale */}
                    {doc.externalLink && (
                      <a
                        href={doc.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary text-[13px] font-black hover:underline px-1 transition-colors"
                      >
                        <span className="material-symbols-rounded text-lg">open_in_new</span>
                        {doc.externalLinkText || "Apri collegamento"}
                      </a>
                    )}

                    {/* Link Guida MIT */}
                    {doc.guideUrl && (
                      <a
                        href={doc.guideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-[13px] font-medium hover:underline px-1 transition-colors"
                      >
                        <span className="material-symbols-rounded text-lg">menu_book</span>
                        {doc.guideUrlText || "Consulta Guida Ufficiale"}
                      </a>
                    )}
                  </div>
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
                      {renderGuide(doc.id, () => toggleDocument(doc.id))}
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
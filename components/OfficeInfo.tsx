import React from 'react';

const OfficeInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 card-shadow p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <span className="material-symbols-rounded text-slate-600 text-3xl">corporate_fare</span>
        <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em]">Info Ufficio</h3>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">UFFICIO MOTORIZZAZIONE CIVILE DI FIRENZE</p>
        <p className="text-xl font-black text-slate-800 tracking-tight">SEZIONE COORDINATA DI SIENA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indirizzo</p>
          <div className="flex items-start gap-2">
            <span className="material-symbols-rounded text-primary text-2xl">location_on</span>
            <a href="#" className="text-[15px] font-black text-slate-800 underline decoration-slate-300 underline-offset-4">
              Viale delle Regioni, 70<br />53100 Siena (SI)
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contatti</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-primary text-2xl">call</span>
            <a href="tel:057739941" className="text-[15px] font-black text-slate-800 underline decoration-slate-300 underline-offset-4">
              0577/39941
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeInfo;
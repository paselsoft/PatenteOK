import React from 'react';
import { useApp } from '../context/AppContext';
import { Toggle } from './ui/Toggle';
import { CITIZENSHIP, LICENSE_CATEGORIES, Citizenship, LicenseCategory } from '../types';
import { Alert } from './ui/Alert';

const ProfileSection: React.FC = () => {
  const { profile, updateProfile } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow overflow-hidden flex flex-col transition-colors">
      {/* Cittadinanza */}
      <div className="px-5 pt-6 pb-2">
        <label htmlFor="citizenship-select" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Cittadinanza</label>
        <div className="relative group">
          <select
            id="citizenship-select"
            value={profile.citizenship}
            onChange={(e) => updateProfile({ citizenship: e.target.value as Citizenship })}
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-[15px] font-semibold text-slate-800 dark:text-slate-100 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
          >
            <option value={CITIZENSHIP.ITALIAN}>Italiana</option>
            <option value={CITIZENSHIP.EU}>Unione Europea</option>
            <option value={CITIZENSHIP.EXTRA_EU}>Extra UE</option>
          </select>
          <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
        </div>
      </div>

      {/* Categoria Patente */}
      <div className="px-5 py-3">
        <label htmlFor="license-category-select" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Categoria Patente</label>
        <div className="relative group">
          <select
            id="license-category-select"
            value={profile.licenseCategory}
            onChange={(e) => updateProfile({ licenseCategory: e.target.value as LicenseCategory })}
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-[15px] font-semibold text-slate-800 dark:text-slate-100 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
          >
            <optgroup label="Ciclomotori e Motocicli">
              <option value={LICENSE_CATEGORIES.AM}>AM - Ciclomotore (2/3 ruote o quadriciclo)</option>
              <option value={LICENSE_CATEGORIES.A1}>A1 - Motocicli leggeri (125cc)</option>
              <option value={LICENSE_CATEGORIES.A2}>A2 - Motocicli media potenza</option>
              <option value={LICENSE_CATEGORIES.A}>A - Motocicli senza limiti</option>
            </optgroup>

            <optgroup label="Autoveicoli Leggeri">
              <option value={LICENSE_CATEGORIES.B1}>B1 - Quadricicli non leggeri</option>
              <option value={LICENSE_CATEGORIES.B}>B - Autoveicoli</option>
              <option value={LICENSE_CATEGORIES.BE}>BE - Auto con rimorchio</option>
            </optgroup>

            <optgroup label="Trasporto Merci">
              <option value={LICENSE_CATEGORIES.C1}>C1 - Camion (fino a 7,5t)</option>
              <option value={LICENSE_CATEGORIES.C1E}>C1E - C1 con rimorchio</option>
              <option value={LICENSE_CATEGORIES.C}>C - Camion (oltre 3,5t)</option>
              <option value={LICENSE_CATEGORIES.CE}>CE - Autotreni ed autoarticolati</option>
            </optgroup>

            <optgroup label="Trasporto Persone">
              <option value={LICENSE_CATEGORIES.D1}>D1 - Minibus (fino a 16 posti)</option>
              <option value={LICENSE_CATEGORIES.D1E}>D1E - D1 con rimorchio</option>
              <option value={LICENSE_CATEGORIES.D}>D - Autobus (oltre 8 posti)</option>
              <option value={LICENSE_CATEGORIES.DE}>DE - Autosnodati</option>
            </optgroup>

            <optgroup label="Certificati Professionali (CAP)">
              <option value={LICENSE_CATEGORIES.KA}>KA - Moto/Auto pubbliche</option>
              <option value={LICENSE_CATEGORIES.KB}>KB - Taxi/NCC</option>
            </optgroup>
          </select>
          <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
        </div>

        {profile.licenseCategory === LICENSE_CATEGORIES.AM && (
          <div className="mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
              <span className="material-symbols-rounded text-primary dark:text-blue-400 font-bold">info</span>
              <div className="text-[13px] leading-relaxed">
                <p className="font-black text-primary dark:text-blue-400 mb-1">Nota per cat. AM</p>
                <p className="text-slate-600 dark:text-slate-300 font-medium">A pagina 4 del modello TT2112 specificare tipo veicolo e cambio. <u className="decoration-primary dark:decoration-blue-400">È richiesta doppia firma (candidato + genitore) su tale nota.</u></p>
              </div>
            </div>
          </div>
        )}

        {/* VALIDATION WARNING: Minorenni + Cat B */}
        {profile.isMinor && profile.licenseCategory === LICENSE_CATEGORIES.B && (
          <div className="mt-4">
            <Alert
              variant="warning"
              title="Requisito Età Non Soddisfatto"
            >
              Per conseguire la patente di categoria B è necessario aver compiuto 18 anni.
            </Alert>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Toggle
          label="Candidato Minorenne"
          description="Richiede approvazione genitoriale"
          checked={profile.isMinor}
          onChange={(checked) => updateProfile({ isMinor: checked })}
        />
        <Toggle
          label="Presentazione con Delega"
          description="Se il candidato non può venire allo sportello (es. tramite Agenzia o parente)"
          checked={profile.isDelegated}
          onChange={(checked) => updateProfile({ isDelegated: checked })}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
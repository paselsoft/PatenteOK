
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DocumentItem, ProfileInfo, CITIZENSHIP, LICENSE_CATEGORIES } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  DOCUMENT_IDS, 
  INITIAL_DOCUMENTS, 
  DELEGA_DOC_ITEM, 
  EXTRA_UE_DOC_ITEM, 
  UE_DOC_ITEM, 
  MINOR_GUIDE_ITEM 
} from '../constants';

interface AppContextType {
  profile: ProfileInfo;
  updateProfile: (updates: Partial<ProfileInfo>) => void;
  documents: DocumentItem[];
  toggleDocument: (id: string) => void;
  simulatePayment: () => void;
  isReadyToSubmit: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistenza Profilo
  const [profile, setProfile] = useLocalStorage<ProfileInfo>('patenteok-profile', {
    citizenship: CITIZENSHIP.ITALIAN,
    licenseCategory: LICENSE_CATEGORIES.AM,
    isMinor: false,
    isDelegated: false,
  });

  // Persistenza Documenti
  const [documents, setDocuments] = useLocalStorage<DocumentItem[]>('patenteok-documents', INITIAL_DOCUMENTS);

  // Stato UI
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Logica Dinamica: Aggiorna la lista documenti in base al profilo
  useEffect(() => {
    setDocuments(prevDocs => {
      const completionMap = new Map(prevDocs.map(d => [d.id, d.completed]));
      let newDocs = [...INITIAL_DOCUMENTS];

      // 1. Gestione Cittadinanza
      const idDocIndex = newDocs.findIndex(d => d.id === DOCUMENT_IDS.IDENTITY_DOCS);
      
      if (profile.citizenship === CITIZENSHIP.EXTRA_EU) {
        if (idDocIndex !== -1) newDocs.splice(idDocIndex, 0, EXTRA_UE_DOC_ITEM);
      } else if (profile.citizenship === CITIZENSHIP.EU) {
        if (idDocIndex !== -1) newDocs.splice(idDocIndex, 0, UE_DOC_ITEM);
      }

      // 2. Gestione Minorenni
      if (profile.isMinor) {
        const currentIdDocIndex = newDocs.findIndex(d => d.id === DOCUMENT_IDS.IDENTITY_DOCS);
        if (currentIdDocIndex !== -1) newDocs.splice(currentIdDocIndex, 0, MINOR_GUIDE_ITEM);
      }

      // 3. Gestione Delega
      if (profile.isDelegated) {
        const currentIdDocIndex = newDocs.findIndex(d => d.id === DOCUMENT_IDS.IDENTITY_DOCS);
        if (currentIdDocIndex !== -1) newDocs.splice(currentIdDocIndex, 0, DELEGA_DOC_ITEM);
      }

      // 4. Ripristino stato completed
      return newDocs.map(doc => ({
        ...doc,
        completed: completionMap.has(doc.id) ? completionMap.get(doc.id)! : false
      }));
    });
  }, [profile.isDelegated, profile.citizenship, profile.isMinor, setDocuments]);

  const updateProfile = (updates: Partial<ProfileInfo>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleDocument = (id: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, completed: !doc.completed } : doc
    ));
  };

  const simulatePayment = () => {
    toggleDocument(DOCUMENT_IDS.PAGOPA);
  };

  const isReadyToSubmit = documents.every(d => d.completed);

  return (
    <AppContext.Provider value={{ 
      profile, 
      updateProfile, 
      documents, 
      toggleDocument, 
      simulatePayment,
      isReadyToSubmit,
      isSidebarOpen,
      toggleSidebar
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

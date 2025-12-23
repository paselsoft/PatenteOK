import { DocumentItem } from './types';

export const DOCUMENT_IDS = {
  TT2112: 'tt2112',
  PAGOPA: 'pagopa',
  MEDICAL_CERT: 'cert_medico',
  IDENTITY_DOCS: 'id_docs',
  DELEGATE_KIT: 'delega_kit',
  EXTRA_UE_GUIDE: 'extra_ue_guide',
  UE_GUIDE: 'ue_guide',
  MINOR_GUIDE: 'minor_guide',
} as const;

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: DOCUMENT_IDS.TT2112,
    title: 'Modulo Domanda (TT2112)',
    subtitle: 'Compilato e firmato',
    completed: false,
    expandable: false,
    downloadUrl: 'https://www.ilportaledellautomobilista.it/documents/56611/128846273/TT2112.pdf/826c655d-eba2-465a-8ab8-c618bddf1d4e',
    warningText: 'Importante: Stampare su fogli singoli (NON fronte/retro).',
  },
  {
    id: DOCUMENT_IDS.PAGOPA,
    title: 'Versamenti PagoPA',
    subtitle: 'Tariffa N067 (€26,40 + €16,00)',
    completed: false,
    required: true,
    warningText: 'Attenzione: Il pagamento deve essere fatto obbligatoriamente a nome dell\'interessato (anche in caso di candidati minorenni), altrimenti la pratica non può essere accettata.',
    externalLink: 'https://www.ilportaledellautomobilista.it/web/portale-automobilista/loginspid',
    externalLinkText: "Accedi al Portale dell'Automobilista",
  },
  {
    id: DOCUMENT_IDS.MEDICAL_CERT,
    title: 'Certificato Medico',
    subtitle: 'Guida passaggi e prenotazione',
    completed: false,
    expandable: true,
  },
  {
    id: DOCUMENT_IDS.IDENTITY_DOCS,
    title: "Documenti d'Identità",
    subtitle: 'Guida ai documenti accettati',
    completed: false,
    expandable: true,
    required: true,
  },
];

// Documenti Dinamici
export const DELEGA_DOC_ITEM: DocumentItem = {
  id: DOCUMENT_IDS.DELEGATE_KIT,
  title: 'Kit Delega',
  subtitle: 'Istruzioni per presentazione tramite terzi',
  completed: false,
  expandable: true,
  required: true,
};

export const EXTRA_UE_DOC_ITEM: DocumentItem = {
  id: DOCUMENT_IDS.EXTRA_UE_GUIDE,
  title: 'Guida Cittadini Extra-UE',
  subtitle: 'Permesso di soggiorno e requisiti',
  completed: false,
  expandable: true,
  required: true,
};

export const UE_DOC_ITEM: DocumentItem = {
  id: DOCUMENT_IDS.UE_GUIDE,
  title: 'Guida Cittadini UE/SEE',
  subtitle: 'Residenza normale e documenti',
  completed: false,
  expandable: true,
  required: true,
};

export const MINOR_GUIDE_ITEM: DocumentItem = {
  id: DOCUMENT_IDS.MINOR_GUIDE,
  title: 'Guida Minorenni',
  subtitle: 'Procedure obbligatorie per under 18',
  completed: false,
  expandable: true,
  required: true,
};

export const RESOURCES = [
  {
    id: 'costs',
    title: 'Tariffe Motorizzazione',
    filename: '022 - Tariffe per operazioni in materia di motorizzazione.pdf',
    category: 'Amministrativo',
    icon: 'payments'
  },
  {
    id: 'drivers',
    title: 'Conducenti e Documenti',
    filename: '400 - Conducenti di veicoli e documenti di guida.pdf',
    category: 'Normativa',
    icon: 'badge'
  },
  {
    id: 'psychophysical',
    title: 'Requisiti Psicofisici',
    filename: '411 - Requisiti psicofisici per patente, CQC, CAP.pdf',
    category: 'Medico',
    icon: 'medical_services'
  },
  {
    id: 'medical_check',
    title: 'Accertamento Requisiti',
    filename: '412 - Accertamento requisiti psicofisici per patenti di guida e CQC.pdf',
    category: 'Medico',
    icon: 'health_and_safety'
  },
  {
    id: 'application',
    title: 'Domande e Documentazione',
    filename: '420 - Domande e documentazione per la patente di guida.pdf',
    category: 'Amministrativo',
    icon: 'folder_open'
  },
  {
    id: 'exams_general',
    title: 'Esami Patente (Generale)',
    filename: '423 - Esami patenti in generale.pdf',
    category: 'Esami',
    icon: 'school'
  },
  {
    id: 'theory_exam',
    title: 'Esame di Teoria',
    filename: '424 - Esame teoria patente (prova di controllo delle cognizioni).pdf',
    category: 'Esami',
    icon: 'menu_book'
  },
  {
    id: 'circular',
    title: 'Circolare Documentazione',
    filename: 'Circolare - 05072001 - 1254M352 - Documentazione amministrativa.pdf',
    category: 'Normativa',
    icon: 'gavel'
  }
] as const;
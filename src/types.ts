
export const CITIZENSHIP = {
  ITALIAN: 'italiana',
  EU: 'ue',
  EXTRA_EU: 'extra-ue',
} as const;

export type Citizenship = typeof CITIZENSHIP[keyof typeof CITIZENSHIP];

export const LICENSE_CATEGORIES = {
  // Ciclomotori
  AM: 'AM',
  A1: 'A1',
  A2: 'A2',
  A: 'A',
  // Auto
  B1: 'B1',
  B: 'B',
  BE: 'BE',
  // Merci
  C1: 'C1',
  C1E: 'C1E',
  C: 'C',
  CE: 'CE',
  // Persone
  D1: 'D1',
  D1E: 'D1E',
  D: 'D',
  DE: 'DE',
  // CAP
  KA: 'KA',
  KB: 'KB',
} as const;

export type LicenseCategory = typeof LICENSE_CATEGORIES[keyof typeof LICENSE_CATEGORIES];

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  required?: boolean;
  expandable?: boolean;
  hasDetails?: boolean;
  isClickable?: boolean;
  downloadUrl?: string;
  warningText?: string;
  externalLink?: string;
  externalLinkText?: string;
  guideUrl?: string; // Link per guide extra (es. MIT)
  guideUrlText?: string;
}

export interface ProfileInfo {
  citizenship: Citizenship | null;
  licenseCategory: LicenseCategory | null;
  isMinor: boolean;
  isDelegated: boolean;
  isAppointmentBooked?: boolean;
  appointmentDate?: string | null;
}

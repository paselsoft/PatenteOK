
import { LicenseCategory } from '../types';

export interface LicenseRule {
    category: LicenseCategory | string;
    minAge: number;
    description: string;
}

export const fetchLicenseRules = async (): Promise<LicenseRule[]> => {
    try {
        const response = await fetch('/docs/categorie_patente.md');
        if (!response.ok) {
            console.error('Failed to fetch license rules markdown');
            return [];
        }
        const text = await response.text();
        return parseLicenseMarkdown(text);
    } catch (error) {
        console.error('Error fetching license rules:', error);
        return [];
    }
};

export const parseLicenseMarkdown = (markdown: string): LicenseRule[] => {
    const rules: LicenseRule[] = [];
    const lines = markdown.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        // Identifica le righe della tabella (iniziano e finiscono con |)
        if (!trimmedLine.startsWith('|') || !trimmedLine.endsWith('|')) continue;

        // Ignora le righe di intestazione o separazione
        if (trimmedLine.includes('---') || trimmedLine.toLowerCase().includes('categoria')) continue;

        const columns = trimmedLine.split('|').map(col => col.trim()).filter(col => col !== '');

        if (columns.length >= 3) {
            // Colonna 1: Categoria (es. **AM**)
            const category = columns[0].replace(/\*\*/g, '').trim();

            // Colonna 2: Età Minima (es. **14 anni**)
            const ageString = columns[1].replace(/\*\*/g, '').trim();
            const minAge = parseInt(ageString.match(/\d+/)?.[0] || '0', 10);

            // Colonna 3: Descrizione (pulizia citazioni)
            // Rimuove [cite_start]...[cite: ...]
            let description = columns[2]
                .replace(/\[cite_start\]/g, '')
                .replace(/\[cite:.*?\]/g, '')
                .trim();

            if (category && minAge > 0) {
                rules.push({
                    category,
                    minAge,
                    description
                });
            }
        }
    }

    return rules;
};

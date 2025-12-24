
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

    // Divide il contenuto per sezioni "## Categoria"
    // L'utilizzo di 'split' con una regex che include il gruppo di cattura (per mantenere il separatore se necessario o gestire meglio)
    // In questo caso splittiamo semplicemente per "## Categoria" e gestiamo il primo elemento vuoto
    const sections = markdown.split(/## Categoria\s+/);

    for (const section of sections) {
        // Ignora sezioni vuote o introspettive che non sembrano categorie
        if (!section.trim() || section.includes('# Categorie di Patente')) continue;

        // La prima riga è il nome della categoria (es. "AM" o "AM\n")
        const lines = section.trim().split('\n');
        const categoryLine = lines[0].trim();

        // Pulizia del nome categoria (rimuove eventuali caratteri extra)
        const category = categoryLine.split(' ')[0].trim();

        if (category) {
            // Cerca l'età minima nel testo della sezione
            const ageMatch = section.match(/Età minima richiesta:.*?(\d+)\s*anni/i);
            const minAge = ageMatch ? parseInt(ageMatch[1], 10) : 0;

            // La descrizione è tutto il resto della sezione, pulita un po'
            // Rimuoviamo la prima riga (categoria) e uniamo il resto
            const description = lines.slice(1).join('\n').trim();

            if (minAge > 0) {
                rules.push({
                    category,
                    minAge,
                    description // Mantiamo il markdown originale per la descrizione
                });
            }
        }
    }

    return rules;
};

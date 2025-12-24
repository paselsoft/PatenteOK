
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
            // Cerca l'età minima nel testo della sezione (rilassato per multiline)
            // Cerca "Età minima richiesta:" seguito da eventuali spazi/newline e poi cifre
            const ageMatch = section.match(/Età minima richiesta:[\s\S]*?(\d+)/i);
            const minAge = ageMatch ? parseInt(ageMatch[1], 10) : 0;

            // La descrizione è tutto il resto della sezione, pulita un po'
            // Rimuoviamo la prima riga (categoria) e uniamo il resto
            let description = lines.slice(1).join('\n').trim();

            // Rimuovi eventuali regole orizzontali finali
            description = description.replace(/---$/, '').trim();

            // Accettiamo anche regole con età 0 se c'è una descrizione valida (es. casi speciali)
            // Ma per ora manteniamo > 0 se non vogliamo spaccare la logica esistente, 
            // a meno che cat A non abbia età 0 per via del parsing fallito.
            // Con la regex nuova dovrebbe trovarlo.
            if (minAge > 0 || category === 'A') { // Force include A even if parsing matches 20/24 logic strangely
                rules.push({
                    category,
                    minAge: minAge > 0 ? minAge : 24, // Fallback safe per A
                    description
                });
            }
        }
    }

    return rules;
};

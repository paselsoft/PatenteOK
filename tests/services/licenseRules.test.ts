import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchLicenseRules, parseLicenseMarkdown } from '../../src/services/licenseRules';

describe('LicenseRules Service', () => {
    describe('parseLicenseMarkdown', () => {
        it('should correctly parse a valid markdown table', () => {
            const markdown = `
| Categoria | Età Minima | Note |
|---|---|---|
| **AM** | **14 anni** | Ciclomotori |
| **A1** | **16 anni** | [cite_start]Link[cite: link] Moto leggere |
            `;
            const result = parseLicenseMarkdown(markdown);
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                category: 'AM',
                minAge: 14,
                description: 'Ciclomotori'
            });
            expect(result[1]).toEqual({
                category: 'A1',
                minAge: 16,
                description: 'Link Moto leggere'
            });
        });

        it('should ignore header and separator lines', () => {
            const markdown = `
| Categoria | Età |
|---|---|
| B | 18 anni | Auto |
            `;
            const result = parseLicenseMarkdown(markdown);
            expect(result).toHaveLength(1);
            expect(result[0].category).toBe('B');
            expect(result[0].minAge).toBe(18);
        });

        it('should handle missing columns gracefully', () => {
            const markdown = `| AM | 14 anni |`; // Only 2 cols
            const result = parseLicenseMarkdown(markdown);
            expect(result).toHaveLength(0); // Code checks for >= 3 columns
        });

        it('should parse age correctly from string', () => {
            const markdown = `| A | 24 anni (20 con accesso graduale) | Moto |`;
            const result = parseLicenseMarkdown(markdown);
            expect(result[0].minAge).toBe(24);
        });

        it('should handle empty or malformed input', () => {
            expect(parseLicenseMarkdown('')).toEqual([]);
            expect(parseLicenseMarkdown('Not a table')).toEqual([]);
        });
    });

    describe('fetchLicenseRules', () => {
        const originalFetch = global.fetch;

        beforeEach(() => {
            global.fetch = vi.fn();
        });

        afterEach(() => {
            global.fetch = originalFetch;
        });

        it('should fetch and parse rules successfully', async () => {
            const mockMarkdown = '| **B** | **18 anni** | Auto |';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global.fetch as any).mockResolvedValue({
                ok: true,
                text: () => Promise.resolve(mockMarkdown),
            });

            const rules = await fetchLicenseRules();
            expect(rules).toHaveLength(1);
            expect(rules[0].category).toBe('B');
            expect(global.fetch).toHaveBeenCalledWith('/docs/categorie_patente.md');
        });

        it('should return empty array on fetch failure', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global.fetch as any).mockResolvedValue({
                ok: false,
            });
            const rules = await fetchLicenseRules();
            expect(rules).toEqual([]);
        });

        it('should return empty array on exception', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global.fetch as any).mockRejectedValue(new Error('Network error'));
            const rules = await fetchLicenseRules();
            expect(rules).toEqual([]);
        });
    });
});

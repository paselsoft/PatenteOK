import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchLicenseRules, parseLicenseMarkdown } from '../../src/services/licenseRules';

describe('LicenseRules Service', () => {
    describe('parseLicenseMarkdown', () => {
        it('should correctly parse the new header-based format', () => {
            const markdown = `
# Categorie di Patente

## Categoria AM

* **Età minima richiesta:** 14 anni.
* Descrizione lunga...

## Categoria A1

* **Età minima richiesta:** 16 anni.
* Altra descrizione...
            `;
            const result = parseLicenseMarkdown(markdown);
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                category: 'AM',
                minAge: 14,
                description: expect.stringContaining('Descrizione lunga')
            });
            expect(result[1]).toEqual({
                category: 'A1',
                minAge: 16,
                description: expect.stringContaining('Altra descrizione')
            });
        });

        it('should parse age correctly from complex strings', () => {
            const markdown = `
## Categoria A

* **Età minima richiesta:** 24 anni (20 se..).
            `;
            const result = parseLicenseMarkdown(markdown);
            expect(result[0].minAge).toBe(24);
        });

        it('should ignore sections without Category header', () => {
            const markdown = `
# Titolo Principale
Intro...
            `;
            const result = parseLicenseMarkdown(markdown);
            expect(result).toHaveLength(0);
        });

        it('should handle empty input', () => {
            expect(parseLicenseMarkdown('')).toEqual([]);
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
            const mockMarkdown = `
## Categoria B

* **Età minima richiesta:** 18 anni.
            `;
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

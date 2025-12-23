
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSection from '../../src/components/ProfileSection';
import { AppProvider } from '../../src/context/AppContext';
import { CITIZENSHIP, LICENSE_CATEGORIES } from '../../src/types';

// Mock hook per rule
vi.mock('../../src/hooks/useLicenseRules', () => ({
    useLicenseRules: () => ({
        getRuleForCategory: (cat: string) => {
            if (cat === 'B') return { minAge: 18, description: 'Auto' };
            if (cat === 'AM') return { minAge: 14, description: 'Ciclomotore' };
            return undefined;
        }
    })
}));

const renderWithContext = () => {
    return render(
        <AppProvider>
            <ProfileSection />
        </AppProvider>
    );
};

describe('ProfileSection', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('renders citizenship and category selectors', () => {
        renderWithContext();
        expect(screen.getByLabelText(/cittadinanza/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoria patente/i)).toBeInTheDocument();
    });

    it('displays warning when age requirement is not met for minors', () => {
        renderWithContext();

        // Seleziona Categoria B (18 anni)
        const categorySelect = screen.getByLabelText(/categoria patente/i);
        fireEvent.change(categorySelect, { target: { value: LICENSE_CATEGORIES.B } });

        // Attiva minorenne
        const minorToggle = screen.getByLabelText(/candidato minorenne/i);
        // Toggle component uses click to change state
        fireEvent.click(minorToggle);

        // Dovrebbe apparire l'alert
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent(/requisito età non soddisfatto/i);
        expect(alert).toHaveTextContent(/18 anni/i);
    });

    it('does not display warning for AM category even if minor', () => {
        renderWithContext();

        // Seleziona Categoria AM (14 anni)
        const categorySelect = screen.getByLabelText(/categoria patente/i);
        fireEvent.change(categorySelect, { target: { value: LICENSE_CATEGORIES.AM } });

        // Attiva minorenne
        const minorToggle = screen.getByLabelText(/candidato minorenne/i);
        fireEvent.click(minorToggle);

        // NON dovrebbe apparire l'alert di età (perché 14 < 18, ma la logica è: se minAge >= 18 e minor=true => warning)
        // AM minAge = 14. 14 < 18. Quindi ok.
        expect(screen.queryByText(/requisito età non soddisfatto/i)).toBeNull();
    });

    it('shows specific info note for AM category', () => {
        renderWithContext();
        const categorySelect = screen.getByLabelText(/categoria patente/i);
        fireEvent.change(categorySelect, { target: { value: LICENSE_CATEGORIES.AM } });

        expect(screen.getByText(/nota per cat. am/i)).toBeInTheDocument();
        expect(screen.getByText(/doppia firma/i)).toBeInTheDocument();
    });
});

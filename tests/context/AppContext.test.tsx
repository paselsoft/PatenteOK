
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';

import { AppProvider, useApp } from '../../src/context/AppContext';
import { CITIZENSHIP } from '../../src/types';
import { DOCUMENT_IDS } from '../../src/constants';

// Mock Component to access context
const TestComponent = () => {
  const { profile, updateProfile, documents, toggleDocument, simulatePayment, isReadyToSubmit } = useApp();
  return (
    <div>
      <div data-testid="citizenship">{profile.citizenship}</div>
      <div data-testid="isMinor">{profile.isMinor.toString()}</div>
      <div data-testid="isReady">{isReadyToSubmit.toString()}</div>

      <button onClick={() => updateProfile({ citizenship: CITIZENSHIP.EXTRA_EU })}>Set Extra EU</button>
      <button onClick={() => updateProfile({ citizenship: CITIZENSHIP.EU })}>Set EU</button>
      <button onClick={() => updateProfile({ isMinor: true })}>Set Minor</button>
      <button onClick={() => updateProfile({ isDelegated: true })}>Set Delegated</button>

      <ul>
        {documents.map(d => (
          <li key={d.id} data-testid={`doc-${d.id}`} data-completed={d.completed}>
            {d.title}
            <button data-testid={`toggle-${d.id}`} onClick={() => toggleDocument(d.id)}>Toggle</button>
          </li>
        ))}
      </ul>
      <button onClick={() => toggleDocument(DOCUMENT_IDS.PAGOPA)}>Toggle PagoPA</button>
      <button onClick={simulatePayment}>Simulate Payment</button>
    </div>
  );
};

describe('AppContext', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides default profile values', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByTestId('citizenship')).toHaveTextContent(CITIZENSHIP.ITALIAN);
    expect(screen.getByTestId('isMinor')).toHaveTextContent('false');
  });

  it('updates profile and persists to localStorage', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const button = screen.getByText('Set Extra EU');
    await act(async () => {
      button.click();
    });

    expect(screen.getByTestId('citizenship')).toHaveTextContent(CITIZENSHIP.EXTRA_EU);
    expect(localStorage.getItem('patenteok-profile')).toContain(CITIZENSHIP.EXTRA_EU);
  });

  it('dynamically adds documents for Extra EU citizens', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.queryByTestId(`doc-${DOCUMENT_IDS.EXTRA_UE_GUIDE}`)).toBeNull();

    await act(async () => {
      screen.getByText('Set Extra EU').click();
    });

    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.EXTRA_UE_GUIDE}`)).toBeInTheDocument();
  });

  it('dynamically adds documents for EU citizens', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.queryByTestId(`doc-${DOCUMENT_IDS.UE_GUIDE}`)).toBeNull();

    await act(async () => {
      screen.getByText('Set EU').click();
    });

    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.UE_GUIDE}`)).toBeInTheDocument();
  });

  it('dynamically adds documents for Minors', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.queryByTestId(`doc-${DOCUMENT_IDS.MINOR_GUIDE}`)).toBeNull();

    await act(async () => {
      screen.getByText('Set Minor').click();
    });

    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.MINOR_GUIDE}`)).toBeInTheDocument();
  });

  it('dynamically adds documents for Delegate', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.queryByTestId(`doc-${DOCUMENT_IDS.DELEGATE_KIT}`)).toBeNull();

    await act(async () => {
      screen.getByText('Set Delegated').click();
    });

    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.DELEGATE_KIT}`)).toBeInTheDocument();
  });

  it('handles combination of flags (e.g. Minor + Extra EU)', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      screen.getByText('Set Minor').click();
    });

    await act(async () => {
      screen.getByText('Set Extra EU').click();
    });

    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.MINOR_GUIDE}`)).toBeInTheDocument();
    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.EXTRA_UE_GUIDE}`)).toBeInTheDocument();
  });

  it('toggles document completion', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const pagopaDoc = screen.getByTestId(`doc-${DOCUMENT_IDS.PAGOPA}`);
    expect(pagopaDoc).toHaveAttribute('data-completed', 'false');

    await act(async () => {
      screen.getByText('Toggle PagoPA').click();
    });

    expect(pagopaDoc).toHaveAttribute('data-completed', 'true');
  });

  it('preserves completion state when document list regenerates', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // 1. Completa PagoPA (documento comune)
    const pagopaDoc = screen.getByTestId(`doc-${DOCUMENT_IDS.PAGOPA}`);
    expect(pagopaDoc).toHaveAttribute('data-completed', 'false');

    await act(async () => {
      screen.getByText('Toggle PagoPA').click();
    });
    expect(pagopaDoc).toHaveAttribute('data-completed', 'true');

    // 2. Cambia profilo, causando rigenerazione lista
    await act(async () => {
      screen.getByText('Set Minor').click();
    });

    // 3. Verifica che PagoPA sia ancora completato e che sia apparsa la guida Minori
    const pagopaDocAfter = screen.getByTestId(`doc-${DOCUMENT_IDS.PAGOPA}`);
    expect(pagopaDocAfter).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.MINOR_GUIDE}`)).toBeInTheDocument();
  });

  it('calculates isReadyToSubmit correctly', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('isReady')).toHaveTextContent('false');

    // Completa un documento
    await act(async () => {
      screen.getByTestId(`toggle-${DOCUMENT_IDS.PAGOPA}`).click();
    });
    expect(screen.getByTestId('isReady')).toHaveTextContent('false');

    // Completa i restanti documenti iniziali
    const initialDocs = [DOCUMENT_IDS.TT2112, DOCUMENT_IDS.MEDICAL_CERT, DOCUMENT_IDS.IDENTITY_DOCS];

    for (const docId of initialDocs) {
      await act(async () => {
        screen.getByTestId(`toggle-${docId}`).click();
      });
    }

    // Verifica finale
    expect(screen.getByTestId('isReady')).toHaveTextContent('true');
  });
});

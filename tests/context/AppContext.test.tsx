
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';

import { AppProvider, useApp } from '../../context/AppContext';
import { CITIZENSHIP } from '../../types';
import { DOCUMENT_IDS } from '../../constants';

// Mock Component to access context
const TestComponent = () => {
  const { profile, updateProfile, documents, toggleDocument, simulatePayment } = useApp();
  return (
    <div>
      <div data-testid="citizenship">{profile.citizenship}</div>
      <div data-testid="isMinor">{profile.isMinor.toString()}</div>
      <button onClick={() => updateProfile({ citizenship: CITIZENSHIP.EXTRA_EU })}>Set Extra EU</button>
      <button onClick={() => updateProfile({ isMinor: true })}>Set Minor</button>
      <button onClick={() => updateProfile({ isDelegated: true })}>Set Delegated</button>

      <ul>
        {documents.map(d => (
          <li key={d.id} data-testid={`doc-${d.id}`} data-completed={d.completed}>
            {d.title}
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

    // Initially no Extra EU guide
    expect(screen.queryByTestId(`doc-${DOCUMENT_IDS.EXTRA_UE_GUIDE}`)).toBeNull();

    // Change to Extra EU
    await act(async () => {
      screen.getByText('Set Extra EU').click();
    });

    // Now it should be present
    expect(screen.getByTestId(`doc-${DOCUMENT_IDS.EXTRA_UE_GUIDE}`)).toBeInTheDocument();
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
});

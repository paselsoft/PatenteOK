

import { render, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../context/ToastContext';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast('Toast Message', 'success')}>Show Toast</button>
  );
};

describe('ToastContext', () => {
  it('mostra il toast quando viene chiamato addToast', () => {
    const { getByText, queryByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Verifica che inizialmente non ci sia
    expect(queryByText('Toast Message')).not.toBeInTheDocument();

    // Trigger toast
    act(() => {
      getByText('Show Toast').click();
    });

    // Verifica presenza
    expect(getByText('Toast Message')).toBeInTheDocument();
  });
});

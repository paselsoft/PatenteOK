
import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '../../../components/ui/Alert';
import { describe, it, expect } from 'vitest';

describe('Alert Component', () => {
  it('renderizza titolo e contenuto', () => {
    const { getByText } = render(<Alert title="Test Title">Test Content</Alert>);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('ha il ruolo ARIA corretto', () => {
    const { getByRole } = render(<Alert>Content</Alert>);
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('applica le classi della variante', () => {
    const { container } = render(<Alert variant="error">Error</Alert>);
    expect(container.firstChild).toHaveClass('bg-red-50');
  });
});



import { render } from '@testing-library/react';
import { Button } from '../../../components/ui/Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
  it('renderizza il contenuto correttamente', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('gestisce il click', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);

    // Usa il metodo nativo click() per evitare problemi di import
    getByText('Click me').click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('mostra l\'icona se fornita', () => {
    const { getByText } = render(<Button icon="add">Icon Button</Button>);
    expect(getByText('add')).toBeInTheDocument();
  });

  it('applica la classe fullWidth', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('rispetta lo stato disabled', () => {
    const { getByText } = render(<Button disabled>Disabled</Button>);
    expect(getByText('Disabled')).toBeDisabled();
  });
});

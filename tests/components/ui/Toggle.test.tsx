
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Toggle } from '../../../components/ui/Toggle';

describe('Toggle', () => {
  it('renders correctly with label', () => {
    render(<Toggle checked={false} onChange={() => { }} label="Test Toggle" />);
    expect(screen.getByText('Test Toggle')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} label="Test Toggle" />);

    // Click layout
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('displays description when provided', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => { }}
        label="Test Toggle"
        description="Helper text"
      />
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});

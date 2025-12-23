
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('dovrebbe inizializzare con il valore di default', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('dovrebbe aggiornare il valore e salvarlo in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('dovrebbe leggere il valore esistente dal localStorage all\'avvio', () => {
    window.localStorage.setItem('test-key', JSON.stringify('existing'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('existing');
  });
});

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLockScroll } from './useLockScroll';
 
describe('useLockScroll', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('sets overflow to "hidden" when lock = true', () => {
    renderHook(({ lock }) => useLockScroll(lock), {
      initialProps: { lock: true },
    });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('does not touch overflow when lock = false', () => {
    renderHook(({ lock }) => useLockScroll(lock), {
      initialProps: { lock: false },
    });
    expect(document.body.style.overflow).toBe('');
  });

  it('restores overflow on unmount', () => {
    const { unmount } = renderHook(() => useLockScroll(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('reacts to lock prop change', () => {
    const { rerender } = renderHook(
      ({ lock }) => useLockScroll(lock),
      { initialProps: { lock: false } }
    );

    expect(document.body.style.overflow).toBe('');

    rerender({ lock: true });
    expect(document.body.style.overflow).toBe('hidden');

    rerender({ lock: false });
    expect(document.body.style.overflow).toBe('');
  });
});
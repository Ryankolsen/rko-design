import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Listener = (e: { matches: boolean }) => void

function stubMatchMedia(matches: boolean) {
  const listeners = new Set<Listener>()
  const mql = {
    matches,
    addEventListener: vi.fn((_: string, fn: Listener) => listeners.add(fn)),
    removeEventListener: vi.fn((_: string, fn: Listener) => listeners.delete(fn)),
  }
  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia
  const fire = (next: boolean) => act(() => listeners.forEach((fn) => fn({ matches: next })))
  return { mql, listeners, fire }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('usePrefersReducedMotion', () => {
  it.each([true, false])('returns %s when the reduce query matches is %s', (matches) => {
    stubMatchMedia(matches)

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(matches)
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
})

describe('usePrefersReducedMotion live updates', () => {
  it('follows the query when it changes', () => {
    const { fire } = stubMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())

    fire(true)
    expect(result.current).toBe(true)

    fire(false)
    expect(result.current).toBe(false)
  })

  it('removes its change listener on unmount', () => {
    const { mql, listeners } = stubMatchMedia(false)
    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(listeners.size).toBe(0)
  })

  it('returns false when matchMedia is unavailable', () => {
    const original = window.matchMedia
    // @ts-expect-error simulating an environment without matchMedia
    delete window.matchMedia
    try {
      const { result } = renderHook(() => usePrefersReducedMotion())
      expect(result.current).toBe(false)
    } finally {
      window.matchMedia = original
    }
  })
})

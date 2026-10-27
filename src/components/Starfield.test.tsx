import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Starfield } from './Starfield'

let arc: ReturnType<typeof vi.fn>

function prefersReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  arc = vi.fn()
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    clearRect: () => {},
    beginPath: () => {},
    arc,
    fill: () => {},
  } as unknown as CanvasRenderingContext2D)
  prefersReducedMotion(false)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Starfield', () => {
  it('renders a decorative canvas hidden from assistive technology', () => {
    const { container } = render(<Starfield />)

    const canvas = container.querySelector('canvas')
    expect(canvas).toHaveAttribute('id', 'starfield')
    expect(canvas).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Starfield motion', () => {
  it('draws one still frame and never animates when reduced motion is preferred', () => {
    prefersReducedMotion(true)
    const raf = vi.spyOn(window, 'requestAnimationFrame')

    render(<Starfield />)

    expect(raf).not.toHaveBeenCalled()
    expect(arc).toHaveBeenCalledTimes(250)
  })

  it('redraws one still frame on resize when reduced motion is preferred', () => {
    prefersReducedMotion(true)
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    render(<Starfield />)

    window.dispatchEvent(new Event('resize'))

    expect(raf).not.toHaveBeenCalled()
    expect(arc).toHaveBeenCalledTimes(500)
  })

  it('runs the twinkle loop otherwise', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1)

    render(<Starfield />)

    expect(raf).toHaveBeenCalled()
  })

  it('cancels the pending frame on unmount', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(42)
    const cancel = vi.spyOn(window, 'cancelAnimationFrame')
    const { unmount } = render(<Starfield />)

    unmount()

    expect(cancel).toHaveBeenCalledWith(42)
  })
})

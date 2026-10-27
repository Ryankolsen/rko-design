import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { RunOptions } from 'axe-core'
import { axe } from 'vitest-axe'
import { renderRoute } from '../test-utils'

// jsdom can't compute rendered colors, so color-contrast is the one rule off;
// the token contrast tests cover it instead.
const AXE_OPTIONS: RunOptions = {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  rules: { 'color-contrast': { enabled: false } },
}

const ROUTES = [
  '/',
  '/bourbon-dojo',
  '/bourbon-dojo/privacy',
  '/panda-jump',
  '/panda-jump/privacy',
  '/wizard-kittenz',
  '/wizard-kittenz/privacy',
]

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
  } as unknown as CanvasRenderingContext2D)
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('axe on every route, inside the real layout', () => {
  it.each(ROUTES)('%s has no violations', async (path) => {
    const { container } = await renderRoute(path)

    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations()
  })

  it('renders Layout around the route', async () => {
    await renderRoute('/')

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toBeInTheDocument()
  })

  it('passes on Panda Jump without a navigation landmark', async () => {
    const { container } = await renderRoute('/panda-jump')

    expect(screen.queryByRole('navigation')).toBeNull()
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations()
  })
})

describe('axe configuration', () => {
  it('disables color-contrast and nothing else', () => {
    expect(AXE_OPTIONS.rules).toEqual({ 'color-contrast': { enabled: false } })
  })
})

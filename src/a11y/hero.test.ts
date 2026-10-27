import { describe, expect, it } from 'vitest'
import baseCss from '../styles/base.css?raw'

const css = baseCss.replace(/\/\*[\s\S]*?\*\//g, '')
const rule = (selector: string) =>
  css.match(new RegExp(String.raw`(?:^|\})\s*${selector.replace(/[.#:]/g, '\\$&')}\s*\{([^}]*)\}`))?.[1]

// Pixel contrast over the hero image is measured in a real browser (see #59);
// these guard the CSS that measurement depends on.
describe('home hero', () => {
  it('sets the subtitle in the full text color, not the muted one', () => {
    expect(rule('.hero-sub')).toContain('var(--color-text)')
    expect(rule('.hero-sub')).not.toContain('--color-text-muted')
  })

  it('draws a scrim behind the hero text, not over the whole image', () => {
    const scrim = rule('.hero-content::before')
    expect(scrim).toBeDefined()
    expect(scrim).toMatch(/radial-gradient/)
    expect(scrim).toMatch(/z-index:\s*-1/)
  })

  it('clips the oversized scrim so the page never scrolls sideways', () => {
    expect(rule('#hero')).toMatch(/overflow:\s*(clip|hidden)/)
  })
})

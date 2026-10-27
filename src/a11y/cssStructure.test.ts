import { describe, expect, it } from 'vitest'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'
import baseCss from '../styles/base.css?raw'

const sheets = import.meta.glob<string>('../**/*.css', { query: '?raw', import: 'default', eager: true })
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '')

describe('stylesheet layout', () => {
  it('keeps shared rules in styles/base.css, not the old style.css', () => {
    expect(Object.keys(import.meta.glob('../styles/base.css', { query: '?raw' }))).toHaveLength(1)
    expect(Object.keys(import.meta.glob('../style.css', { query: '?raw' }))).toHaveLength(0)
  })
})

describe.each([
  ['panda-jump.css', pandaJumpCss, 'pj'],
  ['wizard-kittenz.css', wizardKittenzCss, 'wk'],
])('%s', (_, css, prefix) => {
  it('leaves the page shell to the shared app-* classes', () => {
    for (const part of ['page', 'content', 'banner', 'tagline', 'description', 'store-links']) {
      expect(stripComments(css)).not.toMatch(new RegExp(String.raw`\.${prefix}-${part}\s*\{`))
    }
  })
})

describe.each(Object.entries(sheets))('%s', (_, css) => {
  it('has no top-level bare section or footer rule', () => {
    expect(stripComments(css)).not.toMatch(/(^|\})\s*(section|footer)\s*\{/)
  })

  it('tints with the accent token instead of raw gold rgba()', () => {
    expect(css.replace(/\s/g, '')).not.toContain('rgba(240,168,53')
  })

  it('uses only the documented breakpoints', () => {
    const widths = [...css.matchAll(/\((?:max|min)-width:\s*([\d.]+)px\)/g)].map((m) => m[1])
    for (const width of widths) expect(['480', '680', '899.98', '900']).toContain(width)
  })
})

describe('global h1', () => {
  it('leaves the hero fade-in and glow to the home hero', () => {
    const rule = stripComments(baseCss).match(/(?:^|\})\s*h1\s*\{([^}]*)\}/)![1]
    expect(rule).not.toMatch(/animation|text-shadow|opacity/)
  })
})

import { describe, expect, it } from 'vitest'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'

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

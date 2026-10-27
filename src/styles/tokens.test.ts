import { describe, expect, it } from 'vitest'
import tokensCss from './tokens.css?raw'
import siteCss from './base.css?raw'
import bourbonDojoCss from '../routes/bourbon-dojo/bourbon-dojo.css?raw'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '')

/** The body of each block opened by `prelude`, found by brace matching. */
function blocks(css: string, prelude: RegExp): string[] {
  const text = stripComments(css)
  const bodies: string[] = []
  for (const match of text.matchAll(new RegExp(prelude.source + String.raw`\s*\{`, 'g'))) {
    let depth = 1
    let i = match.index + match[0].length
    const start = i
    for (; depth > 0 && i < text.length; i++) {
      if (text[i] === '{') depth++
      else if (text[i] === '}') depth--
    }
    bodies.push(text.slice(start, i - 1))
  }
  return bodies
}

describe('tokens.css focus ring', () => {
  it('outlines :focus-visible with the focus-ring token, offset from the control', () => {
    const [rule] = blocks(tokensCss, /(?:^|\})\s*:focus-visible/)
    expect(rule).toMatch(/outline:\s*2px solid var\(--color-focus-ring\)/)
    expect(rule).toMatch(/outline-offset:\s*3px/)
  })
})

describe('tokens.css reduced motion', () => {
  const reduced = () => blocks(tokensCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)

  it('has exactly one reduced-motion block', () => {
    expect(reduced()).toHaveLength(1)
  })

  it('turns off animations, smooth scrolling and transform transitions', () => {
    const [body] = reduced()
    expect(body).toMatch(/animation:\s*none/)
    expect(body).toMatch(/scroll-behavior:\s*auto\s*!important/)
    expect(body).toMatch(/transition-property:[^;]*/)
    expect(body.match(/transition-property:([^;]*)/)![1]).not.toMatch(/transform|all/)
  })

  it('caps any remaining transitions at 0.15s', () => {
    const [body] = reduced()
    const [, duration] = body.match(/transition-duration:\s*([\d.]+)s/)!
    expect(Number(duration)).toBeLessThanOrEqual(0.15)
  })

  it('shows fade-in content in its final state and drops hover lifts', () => {
    const [body] = reduced()
    // tokens.css loads first, so these must beat the later page rules.
    expect(body).toMatch(/opacity:\s*1\s*!important/)
    for (const selector of ['.card:hover', '.store-btn.two-line:hover', '.bd-feature-card:hover']) {
      expect(body).toContain(selector)
    }
    expect(body).toMatch(/transform:\s*none/)
  })
})

describe('tokens.css visually-hidden utility', () => {
  it('clips to 1px instead of removing the text from the accessibility tree', () => {
    const [rule] = blocks(tokensCss, /\.visually-hidden/)
    expect(rule).toMatch(/clip(-path)?:/)
    expect(rule).toMatch(/width:\s*1px/)
    expect(rule).not.toMatch(/display:\s*none|visibility:\s*hidden/)
  })
})

describe('stylesheets keep the focus ring', () => {
  it.each([
    ['base.css', siteCss],
    ['bourbon-dojo.css', bourbonDojoCss],
    ['panda-jump.css', pandaJumpCss],
    ['wizard-kittenz.css', wizardKittenzCss],
  ])('%s never removes outlines from interactive elements', (_, css) => {
    // main is focused only programmatically, as the skip-link target.
    const allowed = new Set(['main:focus'])
    const offenders = [...stripComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)]
      .filter(([, , body]) => /outline:\s*(none|0)\b/.test(body))
      .map(([, selector]) => selector.trim())
      .filter((selector) => !allowed.has(selector))
    expect(offenders).toEqual([])
  })
})

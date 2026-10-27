import { describe, expect, it } from 'vitest'
import tokensCss from '../styles/tokens.css?raw'
import { contrastRatio, meetsWcag, type WcagLevel } from './contrast'
import { resolveTheme } from './themeTokens'

interface Pair {
  fg: string
  bg: string
  level: WcagLevel
}

const PAIRS: Pair[] = [
  { fg: '--color-text', bg: '--color-bg', level: 'text' },
  { fg: '--color-text-muted', bg: '--color-bg', level: 'text' },
  { fg: '--color-accent', bg: '--color-bg', level: 'text' },
  { fg: '--color-link', bg: '--color-bg', level: 'text' },
  { fg: '--color-text', bg: '--color-surface', level: 'text' },
  { fg: '--color-text-muted', bg: '--color-surface', level: 'text' },
  { fg: '--color-focus-ring', bg: '--color-bg', level: 'non-text' },
  { fg: '--color-on-accent', bg: '--color-accent', level: 'text' },
]

// Each theme lists the stylesheets that declare its tokens. Later theme
// slices add their class here.
const THEMES: { selector: string; sheets: string[] }[] = [{ selector: ':root', sheets: [tokensCss] }]

describe.each(THEMES)('$selector token contrast', ({ selector, sheets }) => {
  const tokens = resolveTheme(sheets, selector)

  it.each(PAIRS)('$fg on $bg meets $level', ({ fg, bg, level }) => {
    const ratio = contrastRatio(tokens[fg], tokens[bg])
    expect(meetsWcag(ratio, level), `${fg} ${tokens[fg]} on ${bg} ${tokens[bg]} is ${ratio.toFixed(2)}:1`).toBe(true)
  })
})

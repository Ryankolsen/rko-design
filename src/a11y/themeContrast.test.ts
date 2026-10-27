import { describe, expect, it } from 'vitest'
import bourbonDojoCss from '../routes/bourbon-dojo/bourbon-dojo.css?raw'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'
import siteCss from '../styles/base.css?raw'
import tokensCss from '../styles/tokens.css?raw'
import { composite, contrastRatio, meetsWcag, parseColor, type WcagLevel } from './contrast'
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

// Each theme lists the stylesheets that declare its tokens, its background
// and any pairs beyond the shared ones.
const THEMES: { selector: string; sheets: string[]; bg: string; pairs: Pair[] }[] = [
  { selector: ':root', sheets: [tokensCss], bg: '#060812', pairs: PAIRS },
  {
    selector: '.theme-bd',
    sheets: [tokensCss, bourbonDojoCss],
    bg: '#1C0A00',
    pairs: [...PAIRS, { fg: '--color-text-faint', bg: '--color-bg', level: 'text' }],
  },
  {
    selector: '.theme-pj',
    sheets: [tokensCss, pandaJumpCss],
    bg: '#f3faf0',
    pairs: [...PAIRS, { fg: '--color-heading', bg: '--color-bg', level: 'text' }],
  },
  {
    selector: '.theme-wk',
    sheets: [tokensCss, wizardKittenzCss],
    bg: '#0d0d1a',
    pairs: [
      ...PAIRS,
      ...['--color-text-soft', '--wk-gradient-start', '--wk-gradient-mid', '--wk-gradient-end'].map(
        (fg): Pair => ({ fg, bg: '--color-bg', level: 'text' }),
      ),
    ],
  },
]

describe.each(THEMES)('$selector token contrast', ({ selector, sheets, bg, pairs }) => {
  const tokens = resolveTheme(sheets, selector)

  it('sits on its own background', () => {
    expect(tokens['--color-bg'].toLowerCase()).toBe(bg.toLowerCase())
  })

  it.each(pairs)('$fg on $bg meets $level', ({ fg, bg, level }) => {
    const ratio = contrastRatio(tokens[fg], tokens[bg])
    expect(meetsWcag(ratio, level), `${fg} ${tokens[fg]} on ${bg} ${tokens[bg]} is ${ratio.toFixed(2)}:1`).toBe(true)
  })
})

// Tags sit on a translucent tint over the card surface, so measure against
// the color actually seen: tint over surface over page.
describe('home project tag contrast', () => {
  const tokens = resolveTheme([tokensCss], ':root')
  const seen = (tint: string) =>
    composite(parseColor(tint), composite(parseColor(tokens['--color-surface']), parseColor(tokens['--color-bg'])))

  it.each([
    ['default', '--color-tag-text', '--color-tag-bg'],
    ['game', '--color-tag-game-text', '--color-tag-game-bg'],
  ])('%s tag text meets AA on its tint', (_, text, bg) => {
    expect(tokens[text]).toBeDefined()
    const ratio = contrastRatio(tokens[text], seen(tokens[bg]))
    expect(ratio, `${tokens[text]} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5)
  })

  it('styles the game tag from its tokens, not the raw purple', () => {
    const rule = siteCss.match(/\.tag\.game\s*\{([^}]*)\}/)![1]
    expect(rule).toContain('var(--color-tag-game-text)')
    expect(rule).toContain('var(--color-tag-game-bg)')
    expect(rule).not.toMatch(/#9b5de5/i)
    expect(rule).not.toContain('var(--purple)')
  })
})

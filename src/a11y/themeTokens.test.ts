import { describe, expect, it } from 'vitest'
import { readThemeTokens, resolveTheme } from './themeTokens'

describe('readThemeTokens', () => {
  it('returns custom properties keyed by selector and ignores other declarations', () => {
    expect(readThemeTokens(':root{--a:#fff;color:red}')).toEqual({ ':root': { '--a': '#fff' } })
  })
})

describe('readThemeTokens with real stylesheets', () => {
  it('handles comments and several rules in one sheet', () => {
    const css = `
      /* :root { --ignored: #000; } */
      :root { --a: #fff; /* trailing note */ --b: #000; }
      body { color: var(--a); }
      .t { --a: #111; }
    `
    expect(readThemeTokens(css)).toEqual({
      ':root': { '--a': '#fff', '--b': '#000' },
      '.t': { '--a': '#111' },
    })
  })

  it('maps every selector in a selector list', () => {
    expect(readThemeTokens('.a, .b {--x:#000}')).toEqual({ '.a': { '--x': '#000' }, '.b': { '--x': '#000' } })
  })
})

describe('resolveTheme', () => {
  it('resolves var() references between tokens', () => {
    expect(resolveTheme([':root{--a:#000;--b:var(--a)}'], ':root')['--b']).toBe('#000')
  })

  it('lets a theme override win over :root, including through references', () => {
    const theme = resolveTheme([':root{--a:#000;--b:var(--a)}', '.t{--a:#111}'], '.t')
    expect(theme['--a']).toBe('#111')
    expect(theme['--b']).toBe('#111')
  })

  it('uses the fallback of an undefined var()', () => {
    expect(resolveTheme([':root{--a:var(--missing, #222)}'], ':root')['--a']).toBe('#222')
  })

  it('throws naming the token behind an unresolvable var()', () => {
    expect(() => resolveTheme([':root{--a:var(--nope)}'], ':root')).toThrow(/--nope/)
  })

  it('throws on a reference cycle', () => {
    expect(() => resolveTheme([':root{--a:var(--b);--b:var(--a)}'], ':root')).toThrow(/cycle/i)
  })
})

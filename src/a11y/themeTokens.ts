// Test support: reads CSS custom properties out of stylesheet text so the
// contrast tests can check the colors the site actually declares.

export type TokenSet = Record<string, string>
export type TokensBySelector = Record<string, TokenSet>

const RULE = /([^{}]+)\{([^{}]*)\}/g
const CUSTOM_PROPERTY = /(--[\w-]+)\s*:\s*([^;]+)/g
const COMMENT = /\/\*[\s\S]*?\*\//g

export function readThemeTokens(cssText: string): TokensBySelector {
  const result: TokensBySelector = {}

  for (const [, selectorText, body] of cssText.replace(COMMENT, '').matchAll(RULE)) {
    const tokens: TokenSet = {}
    for (const [, name, value] of body.matchAll(CUSTOM_PROPERTY)) tokens[name] = value.trim()
    if (Object.keys(tokens).length === 0) continue

    for (const selector of selectorText.split(',').map((s) => s.trim())) {
      result[selector] = { ...result[selector], ...tokens }
    }
  }

  return result
}

// var(--name) or var(--name, fallback); the fallback may not itself contain parentheses.
const VAR = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g

/**
 * The effective tokens for `selector`: its declarations layered onto `:root`
 * across every sheet, with var() references resolved.
 */
export function resolveTheme(cssTexts: string[], selector: string): TokenSet {
  const sheets = cssTexts.map(readThemeTokens)
  const raw: TokenSet = {}
  for (const layer of [':root', selector]) {
    for (const sheet of sheets) Object.assign(raw, sheet[layer])
  }

  const resolved: TokenSet = {}
  const resolve = (name: string, stack: string[]): string => {
    if (name in resolved) return resolved[name]
    if (stack.includes(name)) throw new Error(`Token cycle: ${[...stack, name].join(' -> ')}`)
    const value = raw[name]
    if (value === undefined) throw new Error(`Unresolvable token ${name}`)
    return (resolved[name] = substitute(value, [...stack, name]))
  }
  const substitute = (value: string, stack: string[]): string =>
    value.replace(VAR, (_, ref: string, fallback?: string) =>
      ref in raw || fallback === undefined ? resolve(ref, stack) : substitute(fallback.trim(), stack),
    )

  for (const name of Object.keys(raw)) resolve(name, [])
  return resolved
}

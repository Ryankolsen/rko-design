import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { contrastRatio, meetsWcag } from '../a11y/contrast'
import { resolveTheme } from '../a11y/themeTokens'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import siteCss from '../style.css?raw'
import tokensCss from '../styles/tokens.css?raw'
import { StoreBadge } from './StoreBadge'

afterEach(cleanup)

describe('StoreBadge with a store URL', () => {
  it('links to the store and announces the new tab', () => {
    render(<StoreBadge platform="ios" url="https://example.com/ios" />)

    const link = screen.getByRole('link', { name: 'Download on iOS (opens in new tab)' })
    expect(link).toHaveAttribute('href', 'https://example.com/ios')
    expect(link).toHaveClass('store-btn', 'ios')
  })

  it('opens the Android store safely in a new tab', () => {
    render(<StoreBadge platform="android" url="https://example.com/android" />)

    const link = screen.getByRole('link', { name: 'Get it on Google Play (opens in new tab)' })
    expect(link).toHaveAttribute('href', 'https://example.com/android')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveClass('store-btn', 'android')
  })

  it('lets the label prop override the platform default', () => {
    render(<StoreBadge platform="ios" url="https://example.com/ios" label="Custom Label" />)

    expect(screen.getByRole('link', { name: 'Custom Label (opens in new tab)' })).toBeInTheDocument()
    expect(screen.queryByText('Download on iOS')).not.toBeInTheDocument()
  })
})

describe('StoreBadge coming soon', () => {
  it('renders plain text instead of a link', () => {
    render(<StoreBadge platform="android" comingSoon />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Coming soon to Google Play')).toHaveClass('store-btn', 'android', 'coming-soon')
  })

  it('says the App Store for iOS', () => {
    render(<StoreBadge platform="ios" comingSoon />)

    expect(screen.getByText('Coming soon to the App Store')).toBeInTheDocument()
  })

  it('treats a missing url as coming soon', () => {
    render(<StoreBadge platform="android" />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Coming soon to Google Play')).toBeInTheDocument()
  })

  it('is coming soon even when a url is given', () => {
    render(<StoreBadge platform="android" url="https://example.com/android" comingSoon />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('lets the label prop override the coming-soon text', () => {
    render(<StoreBadge platform="android" comingSoon label="Coming Soon on Google Play" />)

    expect(screen.getByText('Coming Soon on Google Play')).toBeInTheDocument()
    expect(screen.queryByText('Coming soon to Google Play')).not.toBeInTheDocument()
  })

  it('does not claim to be a disabled control', () => {
    render(<StoreBadge platform="android" comingSoon />)

    expect(screen.getByText('Coming soon to Google Play')).not.toHaveAttribute('aria-disabled')
  })
})

/** Declarations of the rule whose selector list is exactly `selector`. */
function declarations(css: string, selector: string): Record<string, string> {
  const rule = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(
    ([, s]) => s.trim() === selector,
  )
  if (!rule) throw new Error(`No rule for ${selector}`)
  return Object.fromEntries(
    rule[2]
      .split(';')
      .map((d) => d.split(':').map((part) => part.trim()))
      .filter(([name, value]) => name && value)
      .map(([name, ...value]) => [name, value.join(':')]),
  )
}

const tokens = resolveTheme([tokensCss], ':root')
const resolve = (value: string) => value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => tokens[name])
const borderColor = (decls: Record<string, string>) =>
  resolve(decls['border-color'] ?? decls.border.replace(/^\S+\s+\S+\s+/, ''))

describe('StoreBadge styles', () => {
  const storeBtnRules = () =>
    [...siteCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
      .map(([, selector, body]) => [selector, body])
      .filter(([selector]) => selector.includes('.store-btn'))

  it('never fades a badge with opacity', () => {
    for (const [selector, body] of storeBtnRules()) {
      const opacity = body.match(/opacity:\s*([\d.]+)/)
      if (opacity) expect(Number(opacity[1]), selector.trim()).toBeGreaterThanOrEqual(1)
    }
  })

  it('is at least 44px tall', () => {
    expect(declarations(siteCss, '.store-btn')['min-height']).toBe('44px')
  })

  it('makes the coming-soon badge readable and visibly bounded on the site background', () => {
    const soon = declarations(siteCss, '.store-btn.coming-soon')
    const bg = resolve(soon.background)
    const page = tokens['--color-bg']

    expect(meetsWcag(contrastRatio(resolve(soon.color), bg), 'text')).toBe(true)
    expect(meetsWcag(contrastRatio(borderColor(soon), page), 'non-text')).toBe(true)
  })

  it('makes the coming-soon badge readable and visibly bounded on the Panda Jump page', () => {
    const soon = declarations(pandaJumpCss, '.pj-page .store-btn.coming-soon')
    const page = declarations(pandaJumpCss, '.pj-page').background

    expect(meetsWcag(contrastRatio(soon.color, soon.background), 'text')).toBe(true)
    expect(meetsWcag(contrastRatio(borderColor(soon), page), 'non-text')).toBe(true)
  })
})

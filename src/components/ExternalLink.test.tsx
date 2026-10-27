import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ExternalLink } from './ExternalLink'

afterEach(cleanup)

describe('ExternalLink', () => {
  it('announces that it opens a new tab', () => {
    render(<ExternalLink href="https://x.test">X</ExternalLink>)

    expect(screen.getByRole('link', { name: 'X (opens in new tab)' })).toHaveAttribute('href', 'https://x.test')
  })
})

describe('ExternalLink behaviour', () => {
  const link = () => screen.getByRole('link', { name: /opens in new tab/ })

  it('opens in a new tab without giving the page access to its opener', () => {
    render(<ExternalLink href="https://x.test">X</ExternalLink>)

    expect(link()).toHaveAttribute('target', '_blank')
    expect(link()).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('keeps the suffix visually hidden', () => {
    render(<ExternalLink href="https://x.test">X</ExternalLink>)

    expect(screen.getByText('(opens in new tab)')).toHaveClass('visually-hidden')
  })

  it('passes className and other anchor props through', () => {
    render(
      <ExternalLink href="https://x.test" className="store-btn ios" data-testid="ext">
        X
      </ExternalLink>,
    )

    expect(link()).toHaveClass('store-btn', 'ios')
    expect(link()).toHaveAttribute('data-testid', 'ext')
  })

  it('appends the announcement to an aria-label', () => {
    render(
      <ExternalLink href="https://x.test" aria-label="Label">
        X
      </ExternalLink>,
    )

    expect(screen.getByRole('link', { name: 'Label (opens in new tab)' })).toBeInTheDocument()
  })

  it('overrides target and rel passed by callers', () => {
    render(
      <ExternalLink href="https://x.test" target="_self" rel="opener">
        X
      </ExternalLink>,
    )

    expect(link()).toHaveAttribute('target', '_blank')
    expect(link()).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { StoreBadge } from './StoreBadge'

afterEach(cleanup)

describe('StoreBadge', () => {
  it('renders an iOS link with href, text, and class', () => {
    render(<StoreBadge platform="ios" url="https://example.com/ios" />)

    const link = screen.getByRole('link', { name: 'Download on iOS' })
    expect(link).toHaveAttribute('href', 'https://example.com/ios')
    expect(link).toHaveTextContent('Download on iOS')
    expect(link).toHaveClass('store-btn', 'ios')
    expect(link).not.toHaveClass('disabled')
  })

  it('renders an Android link with href, text, and class', () => {
    render(<StoreBadge platform="android" url="https://example.com/android" />)

    const link = screen.getByRole('link', { name: 'Get it on Google Play' })
    expect(link).toHaveAttribute('href', 'https://example.com/android')
    expect(link).toHaveTextContent('Get it on Google Play')
    expect(link).toHaveClass('store-btn', 'android')
  })

  it('renders a disabled badge as a span, not a link, with the disabled class', () => {
    render(
      <StoreBadge platform="android" disabled label="Coming Soon on Google Play" />,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    const span = screen.getByText('Coming Soon on Google Play')
    expect(span).toHaveAttribute('aria-disabled', 'true')
    expect(span).toHaveClass('store-btn', 'android', 'disabled')
  })

  it('lets the label prop override the platform default', () => {
    render(
      <StoreBadge platform="ios" url="https://example.com/ios" label="Custom Label" />,
    )

    expect(screen.getByRole('link', { name: 'Custom Label' })).toBeInTheDocument()
    expect(screen.queryByText('Download on iOS')).not.toBeInTheDocument()
  })

  it('opens non-disabled links in a new tab safely', () => {
    render(<StoreBadge platform="ios" url="https://example.com/ios" />)

    const link = screen.getByRole('link', { name: 'Download on iOS' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

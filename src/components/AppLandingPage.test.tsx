import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../test-utils'
import { AppLandingPage } from './AppLandingPage'

afterEach(cleanup)

describe('AppLandingPage', () => {
  it('renders the app name with minimal props', async () => {
    await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
      />,
    )

    expect(screen.getByText('Test App')).toBeInTheDocument()
  })

  it('renders tagline, description, store links, and footer links', async () => {
    await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[{ platform: 'ios', url: 'https://example.com' }]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
      />,
    )

    expect(screen.getByText('A tagline.')).toBeInTheDocument()
    expect(screen.getByText('A description.')).toBeInTheDocument()

    const storeLink = screen.getByRole('link', { name: /download on ios/i })
    expect(storeLink).toHaveAttribute('href', 'https://example.com')

    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' })
    expect(privacyLink).toHaveAttribute('href', '/test-app/privacy')

    const contactLink = screen.getByRole('link', { name: 'test@example.com' })
    expect(contactLink).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('renders a features grid with items in order when features is provided', async () => {
    await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
        features={[
          { icon: <span>icon-1</span>, title: 'Feature One', body: 'Body one.' },
          { icon: <span>icon-2</span>, title: 'Feature Two', body: 'Body two.' },
        ]}
      />,
    )

    const titles = screen.getAllByRole('heading', { level: 3 })
    expect(titles).toHaveLength(2)
    expect(titles[0]).toHaveTextContent('Feature One')
    expect(titles[1]).toHaveTextContent('Feature Two')
    expect(screen.getByText('Body one.')).toBeInTheDocument()
    expect(screen.getByText('Body two.')).toBeInTheDocument()
  })

  it('renders no features section when features is omitted', async () => {
    const { container } = await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
      />,
    )

    expect(container.querySelectorAll('.app-features')).toHaveLength(0)
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
  })

  it('renders no features section when features is an empty array', async () => {
    const { container } = await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
        features={[]}
      />,
    )

    expect(container.querySelectorAll('.app-features')).toHaveLength(0)
  })

  it('renders a disabled store link as non-link text', async () => {
    await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        bannerImage={{ src: '/test-app.png', alt: 'Test App banner' }}
        storeLinks={[{ platform: 'android', disabled: true, label: 'Coming Soon' }]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
      />,
    )

    expect(screen.queryByRole('link', { name: /coming soon/i })).not.toBeInTheDocument()
    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
  })

  it('renders an icon+wordmark hero when heroIcon is given instead of a banner image', async () => {
    await renderWithRouter(
      <AppLandingPage
        appName="Test App"
        tagline="A tagline."
        description="A description."
        heroIcon={{ src: '/test-app-icon.png', alt: 'Test App icon' }}
        storeLinks={[]}
        privacyHref="/test-app/privacy"
        contactEmail="test@example.com"
      />,
    )

    expect(screen.getByAltText('Test App icon')).toBeInTheDocument()
  })
})

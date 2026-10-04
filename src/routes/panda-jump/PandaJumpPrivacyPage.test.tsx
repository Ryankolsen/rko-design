import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import { Route } from './privacy'

afterEach(cleanup)

const PandaJumpPrivacyPage = Route.options.component as () => React.ReactElement

describe('PandaJumpPrivacyPage', () => {
  it('renders all 6 numbered section headings in order', async () => {
    await renderWithRouter(<PandaJumpPrivacyPage />)

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(6)
    expect(headings.map((h) => h.textContent)).toEqual([
      '1. Information We Collect',
      '2. Information We Do NOT Collect',
      '3. Permissions',
      "4. Children's Privacy",
      '5. Changes to This Policy',
      '6. Contact Us',
    ])
  })

  it('renders the fixed contact email exactly once', async () => {
    await renderWithRouter(<PandaJumpPrivacyPage />)

    const contactLinks = screen.getAllByRole('link', { name: 'rkolsen.design@gmail.com' })
    expect(contactLinks).toHaveLength(1)
    expect(contactLinks[0]).toHaveAttribute('href', 'mailto:rkolsen.design@gmail.com')
  })

  it('renders the meta line', async () => {
    await renderWithRouter(<PandaJumpPrivacyPage />)

    expect(
      screen.getByText('Effective date: October 2, 2026 · App: Panda Jump · Package: com.ryankolsen.pandajump'),
    ).toBeInTheDocument()
  })

  it('points the back-link at / (not /panda-jump)', async () => {
    await renderWithRouter(<PandaJumpPrivacyPage />)

    const backLink = screen.getByRole('link', { name: '← RKO Design' })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('renders the intro paragraph before the first numbered heading', async () => {
    await renderWithRouter(<PandaJumpPrivacyPage />)

    const intro = screen.getByText(
      /This Privacy Policy describes how Panda Jump \("we," "us," or "our"\) handles information/,
    )
    const firstHeading = screen.getByRole('heading', { level: 2, name: '1. Information We Collect' })

    expect(intro).toBeInTheDocument()
    expect(
      intro.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})

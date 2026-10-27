import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import { BourbonDojoPrivacyPage } from './privacy'

afterEach(cleanup)

const EXPECTED_HEADINGS = [
  'Information We Collect',
  'How We Use Your Information',
  'What Others Can See',
  'Data Storage',
  'Third-Party Services',
  'Data Retention and Deletion',
  "Children's Privacy",
  'Your Rights',
  'Changes to This Policy',
  'Contact',
]

describe('BourbonDojoPrivacyPage', () => {
  it('renders all 10 section headings in order', async () => {
    await renderWithRouter(<BourbonDojoPrivacyPage />, { initialPath: '/bourbon-dojo/privacy' })

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(10)
    headings.forEach((heading, i) => {
      expect(heading).toHaveTextContent(EXPECTED_HEADINGS[i])
    })
  })

  it('renders the contact email as rkolsen.design@gmail.com', async () => {
    await renderWithRouter(<BourbonDojoPrivacyPage />, { initialPath: '/bourbon-dojo/privacy' })

    const contactLinks = screen.getAllByRole('link', { name: 'rkolsen.design@gmail.com' })
    expect(contactLinks.length).toBeGreaterThan(0)
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'mailto:rkolsen.design@gmail.com')
    })
  })

  it('renders no headings with a leading number', async () => {
    await renderWithRouter(<BourbonDojoPrivacyPage />, { initialPath: '/bourbon-dojo/privacy' })

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(10)
    headings.forEach((heading) => {
      expect(heading.textContent).not.toMatch(/^\d+\./)
    })
  })

  const open = () => renderWithRouter(<BourbonDojoPrivacyPage />, { initialPath: '/bourbon-dojo/privacy' })

  it('mentions email and password sign-in', async () => {
    await open()
    expect(screen.getAllByText(/email and password/i).length).toBeGreaterThan(0)
  })

  it('describes in-app deletion with a 30-day grace period', async () => {
    await open()
    expect(screen.getByText(/30-day grace period/i)).toBeInTheDocument()
    expect(screen.getByText(/Delete Account/)).toBeInTheDocument()
  })

  it('states Dojo Duel ghost runs are anonymous in the visibility section', async () => {
    await open()
    const heading = screen.getByRole('heading', { level: 2, name: 'What Others Can See' })
    const section = heading.parentElement as HTMLElement
    expect(within(section).getAllByText(/anonymous/i).length).toBeGreaterThan(0)
  })

  it('lists profile photo', async () => {
    await open()
    expect(screen.getAllByText(/profile photo|avatar/i).length).toBeGreaterThan(0)
  })

  it('lists achievements', async () => {
    await open()
    expect(screen.getAllByText(/achievements/i).length).toBeGreaterThan(0)
  })

  it('does not mention push notifications', async () => {
    await open()
    expect(screen.queryByText(/push notification/i)).toBeNull()
  })

  it('does not mention BourbonVault', async () => {
    await open()
    expect(screen.queryByText(/BourbonVault/)).toBeNull()
  })

  it('no longer shows the April 25, 2026 date', async () => {
    await open()
    expect(screen.queryByText(/April 25, 2026/)).toBeNull()
  })
})

describe('BourbonDojoPrivacyPage external links', () => {
  it('announces that each third-party policy opens in a new tab', async () => {
    await renderWithRouter(<BourbonDojoPrivacyPage />)

    const google = screen.getAllByRole('link', { name: "Google's Privacy Policy (opens in new tab)" })
    expect(google).toHaveLength(2)
    for (const link of google) expect(link).toHaveAttribute('href', 'https://policies.google.com/privacy')
    expect(screen.getByRole('link', { name: "Apple's Privacy Policy (opens in new tab)" })).toHaveAttribute(
      'href',
      'https://www.apple.com/legal/privacy/',
    )
    expect(screen.getByRole('link', { name: "Supabase's Privacy Policy (opens in new tab)" })).toHaveAttribute(
      'href',
      'https://supabase.com/privacy',
    )
  })
})

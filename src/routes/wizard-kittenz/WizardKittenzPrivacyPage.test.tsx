import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import { WizardKittenzPrivacyPage } from './privacy'

afterEach(cleanup)

const EXPECTED_HEADINGS = [
  '1. Information We Collect',
  '2. Information We Do NOT Collect',
  '3. How We Use Your Information',
  '4. Third-Party Services',
  '5. Data Retention',
  "6. Children's Privacy",
  '7. Your Rights & Account Deletion',
  '8. Security',
  '9. Changes to This Policy',
  '10. Contact Us',
]

describe('WizardKittenzPrivacyPage', () => {
  it('renders all 10 numbered section headings in order', async () => {
    await renderWithRouter(<WizardKittenzPrivacyPage />)

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(10)
    headings.forEach((heading, i) => {
      expect(heading).toHaveTextContent(EXPECTED_HEADINGS[i])
    })
  })

  it('renders the fixed contact email exactly once, with no duplicate contact block', async () => {
    await renderWithRouter(<WizardKittenzPrivacyPage />)

    const contactLinks = screen.getAllByRole('link', { name: 'rkolsen.design@gmail.com' })
    expect(contactLinks).toHaveLength(1)
    expect(contactLinks[0]).toHaveAttribute('href', 'mailto:rkolsen.design@gmail.com')
  })

  it('renders the intro paragraph before the first numbered heading, not inside its body', async () => {
    await renderWithRouter(<WizardKittenzPrivacyPage />)

    const intro = screen.getByText(/This Privacy Policy describes how Wizard Kittenz/)
    const firstHeading = screen.getByRole('heading', { level: 2, name: '1. Information We Collect' })

    expect(
      intro.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('does not contain the old contact email anywhere in the rendered output', async () => {
    const { container } = await renderWithRouter(<WizardKittenzPrivacyPage />)

    expect(container.innerHTML).not.toContain('ryankolsen@gmail.com')
  })

  it('renders the meta line and back-link', async () => {
    await renderWithRouter(<WizardKittenzPrivacyPage />)

    expect(
      screen.getByText('Effective date: May 13, 2026 · App: Wizard Kittenz · Package: com.wizardkittenz.game'),
    ).toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: '← Wizard Kittenz' })
    expect(backLink).toHaveAttribute('href', '/wizard-kittenz')
  })
})

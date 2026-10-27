import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import wizardKittenzCss from './wizard-kittenz.css?raw'
import { projects } from '../../data/projects'
import { renderWithRouter } from '../../test-utils'
import { WizardKittenzPage } from './index'

afterEach(cleanup)

const credit = projects.find((p) => p.href === '/wizard-kittenz')!.credit!

describe('WizardKittenzPage soundtrack credit', () => {
  it('renders a Soundtrack heading', async () => {
    await renderWithRouter(<WizardKittenzPage />)

    expect(screen.getByRole('heading', { name: 'Soundtrack' })).toBeInTheDocument()
  })

  it('renders the credit text and an external link to the composer site', async () => {
    const { container } = await renderWithRouter(<WizardKittenzPage />)

    expect(container.textContent).toContain(
      'Our soundtrack was custom produced without the use of AI by Elliot Priest — Early20digital.com',
    )
    const link = screen.getByRole('link', { name: 'Early20digital.com (opens in new tab)' })
    expect(link).toHaveAttribute('href', 'https://early20digital.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('reads name and url from project data', async () => {
    const { container } = await renderWithRouter(<WizardKittenzPage />)

    expect(container.textContent).toContain(credit.name)
    expect(screen.getByRole('link', { name: `${credit.linkLabel} (opens in new tab)` })).toHaveAttribute('href', credit.url)
  })

  it('places the section after the store buttons and before the Privacy Policy link', async () => {
    await renderWithRouter(<WizardKittenzPage />)

    const play = screen.getByRole('link', { name: /Get it on Google Play/ })
    const heading = screen.getByRole('heading', { name: 'Soundtrack' })
    const privacy = screen.getByRole('link', { name: 'Privacy Policy' })

    expect(play.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(heading.compareDocumentPosition(privacy) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

describe('WizardKittenzPage credit link styling', () => {
  it('underlines the credit link at rest so it is not told apart by color alone', () => {
    const rule = wizardKittenzCss.match(/\.wk-credit-text a\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).not.toMatch(/text-decoration:\s*none/)
  })
})

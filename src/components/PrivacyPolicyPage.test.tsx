import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../test-utils'
import { PrivacyPolicyPage } from './PrivacyPolicyPage'

afterEach(cleanup)

describe('PrivacyPolicyPage', () => {
  it('renders the given sections with their heading and body', async () => {
    await renderWithRouter(
      <PrivacyPolicyPage
        appName="Test App"
        effectiveDate="Effective: Jan 1, 2026"
        backHref="/test-app"
        backLabel="← Test App"
        contactEmail="test@example.com"
        sections={[{ heading: 'Section One', body: 'Body one.' }]}
      />,
    )

    expect(screen.getByText('Section One')).toBeInTheDocument()
    expect(screen.getByText('Body one.')).toBeInTheDocument()
  })

  it('renders app name, effective date, back-link, and contact link', async () => {
    await renderWithRouter(
      <PrivacyPolicyPage
        appName="Test App"
        effectiveDate="Effective: Jan 1, 2026"
        backHref="/test-app"
        backLabel="← Test App"
        contactEmail="test@example.com"
        sections={[{ heading: 'Section One', body: 'Body one.' }]}
      />,
    )

    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(screen.getByText('Effective: Jan 1, 2026')).toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: '← Test App' })
    expect(backLink).toHaveAttribute('href', '/test-app')

    const contactLink = screen.getByRole('link', { name: 'test@example.com' })
    expect(contactLink).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('renders a 10-section array in order with no extra numbering applied', async () => {
    const sections = Array.from({ length: 10 }, (_, i) => ({
      heading: `${i + 1}. Section ${i + 1}`,
      body: `Body for section ${i + 1}.`,
    }))

    await renderWithRouter(
      <PrivacyPolicyPage
        appName="Wizard Kittenz"
        effectiveDate="Effective date: May 13, 2026"
        backHref="/wizard-kittenz"
        backLabel="← Wizard Kittenz"
        contactEmail="ryankolsen@gmail.com"
        sections={sections}
      />,
    )

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(10)
    headings.forEach((heading, i) => {
      expect(heading).toHaveTextContent(`${i + 1}. Section ${i + 1}`)
    })
  })

  it('renders correctly with a single section and does not mangle a manually numbered heading', async () => {
    await renderWithRouter(
      <PrivacyPolicyPage
        appName="Panda Jump"
        effectiveDate="Effective date: October 2, 2026"
        backHref="/panda-jump"
        backLabel="← Panda Jump"
        contactEmail="ryankolsen@gmail.com"
        sections={[{ heading: '1. Information We Collect', body: 'None.' }]}
      />,
    )

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('1. Information We Collect')
  })
})

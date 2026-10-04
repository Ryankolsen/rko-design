import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import { BourbonDojoPrivacyPage } from './privacy'

afterEach(cleanup)

const EXPECTED_HEADINGS = [
  'Information We Collect',
  'How We Use Your Information',
  'Data Storage',
  'Third-Party Services',
  'Data Retention and Deletion',
  "Children's Privacy",
  'Your Rights',
  'Changes to This Policy',
  'Contact',
]

describe('BourbonDojoPrivacyPage', () => {
  it('renders all 9 section headings in order', async () => {
    await renderWithRouter(<BourbonDojoPrivacyPage />, { initialPath: '/bourbon-dojo/privacy' })

    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(9)
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
    expect(headings).toHaveLength(9)
    headings.forEach((heading) => {
      expect(heading.textContent).not.toMatch(/^\d+\./)
    })
  })
})

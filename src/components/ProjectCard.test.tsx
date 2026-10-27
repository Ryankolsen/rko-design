import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../test-utils'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

afterEach(cleanup)

function cardFor(href: string) {
  const project = projects.find((p) => p.href === href)
  if (!project) throw new Error(`missing project ${href}`)
  return <ProjectCard {...project} />
}

describe('ProjectCard soundtrack credit', () => {
  it('links to the composer site safely in a new tab, and says so', async () => {
    await renderWithRouter(cardFor('/wizard-kittenz'))

    const link = screen.getByRole('link', { name: /^Early20digital\.com \(opens in new tab\)$/ })
    expect(link).toHaveAttribute('href', 'https://early20digital.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the credit text with a decorative note', async () => {
    const { container } = await renderWithRouter(cardFor('/wizard-kittenz'))

    const credit = container.querySelector('.card-credit') as HTMLElement
    expect(credit).not.toBeNull()
    expect(credit.textContent).toBe(
      // The trailing suffix is visually hidden; it is there for screen readers.
      '♪ Soundtrack custom produced without AI by Elliot Priest · Early20digital.com (opens in new tab)',
    )
    expect(screen.getByText('♪')).toHaveAttribute('aria-hidden', 'true')
  })

  it('places the credit after the description and before the store badges', async () => {
    const { container } = await renderWithRouter(cardFor('/wizard-kittenz'))

    const description = screen.getByText(/Cats\. Magic\. Chaos\./)
    const credit = container.querySelector('.card-credit') as HTMLElement
    const storeLinks = container.querySelector('.store-links') as HTMLElement
    expect(description.compareDocumentPosition(credit) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(credit.compareDocumentPosition(storeLinks) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('renders no credit for projects without one', async () => {
    for (const href of ['/bourbon-dojo', '/panda-jump']) {
      const { container } = await renderWithRouter(cardFor(href))
      expect(screen.queryByText('Early20digital.com')).toBeNull()
      expect(screen.queryByText(/Soundtrack/)).toBeNull()
      expect(container.querySelector('.card-credit')).toBeNull()
      cleanup()
    }
  })
})

import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../test-utils'
import siteCss from '../style.css?raw'
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

describe('ProjectCard links', () => {
  const project = projects.find((p) => p.href === '/wizard-kittenz')!

  it('makes the title heading the link to the project page', async () => {
    await renderWithRouter(<ProjectCard {...project} />)

    const heading = screen.getByRole('heading', { level: 3, name: project.title })
    const link = within(heading).getByRole('link', { name: project.title })
    expect(link).toHaveAttribute('href', project.href)
  })

  it('exposes exactly one link to the project page', async () => {
    await renderWithRouter(<ProjectCard {...project} />)

    const toProject = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === project.href)
    expect(toProject).toHaveLength(1)
  })

  it('keeps the image clickable but out of the tab order and accessibility tree', async () => {
    const { container } = await renderWithRouter(<ProjectCard {...project} />)

    const imageLink = container.querySelector('.card-img') as HTMLElement
    expect(imageLink).toHaveAttribute('href', project.href)
    expect(imageLink).toHaveAttribute('tabindex', '-1')
    expect(imageLink).toHaveAttribute('aria-hidden', 'true')
    expect(imageLink.querySelector('img')).toHaveAttribute('alt', project.imageAlt)
  })

  it('keeps the credit and store badges as their own links', async () => {
    await renderWithRouter(<ProjectCard {...project} />)

    expect(screen.getByRole('link', { name: /Early20digital\.com/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Download on iOS/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Get it on Google Play/ })).toBeInTheDocument()
  })
})

describe('ProjectCard credit styles', () => {
  it('does not fade the credit with opacity', () => {
    const rule = siteCss.match(/\.card-credit\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).not.toMatch(/opacity/)
  })
})

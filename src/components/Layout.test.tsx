import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '../test-utils'
import { projects } from '../data/projects'
import { Layout } from './Layout'

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
  } as unknown as CanvasRenderingContext2D)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Layout', () => {
  it('renders the project nav on the portfolio home', async () => {
    await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

    expect(screen.getByRole('link', { name: 'Bourbon Dojo' })).toBeInTheDocument()
  })

  it.each(['/panda-jump', '/panda-jump/privacy'])(
    'renders no links to other projects on %s',
    async (path) => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: path })

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: 'Bourbon Dojo' })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: 'Wizard Kittenz' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument()
      expect(screen.getByText('content')).toBeInTheDocument()
    },
  )

  describe('mobile menu button', () => {
    it('renders a collapsed menu button', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      const button = screen.getByRole('button', { name: 'Open menu' })
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('toggles between open and closed', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    })

    it('controls the nav link list', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      const id = screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-controls')
      expect(id).toBeTruthy()
      const list = document.getElementById(id!)
      expect(list).not.toBeNull()
      expect(list!.tagName).toBe('UL')
      expect(screen.getByRole('navigation')).toContainElement(list)
    })

    it.each(['Home', 'Projects', 'About', ...projects.map((p) => p.navLabel)])(
      'renders the %s link exactly once',
      async (name) => {
        await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

        expect(screen.getAllByRole('link', { name })).toHaveLength(1)
      },
    )
  })
})

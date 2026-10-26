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

  describe('mobile menu dismissal', () => {
    async function renderOpen() {
      await renderWithRouter(<Layout><p>outside</p></Layout>, { initialPath: '/' })
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    }
    const closedButton = () => screen.getByRole('button', { name: 'Open menu' })

    it('closes on Escape and returns focus to the menu button', async () => {
      await renderOpen()

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(closedButton()).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(closedButton())
    })

    it('ignores Escape while closed and leaves focus alone', async () => {
      await renderWithRouter(<Layout><p>outside</p></Layout>, { initialPath: '/' })

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(closedButton()).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).not.toBe(closedButton())
    })

    it('ignores other keys while open', async () => {
      await renderOpen()

      fireEvent.keyDown(document, { key: 'Enter' })

      expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    })

    it('closes on pointerdown outside the nav', async () => {
      await renderOpen()

      fireEvent.pointerDown(screen.getByText('outside'))

      expect(closedButton()).toHaveAttribute('aria-expanded', 'false')
    })

    it('stays open on pointerdown inside the nav', async () => {
      await renderOpen()

      fireEvent.pointerDown(document.getElementById('nav-links')!)

      expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    })

    it('closes exactly once when the button is pressed while open', async () => {
      await renderOpen()
      const button = screen.getByRole('button', { name: 'Close menu' })

      fireEvent.pointerDown(button)
      fireEvent.click(button)

      expect(closedButton()).toHaveAttribute('aria-expanded', 'false')
    })

    it('removes document listeners on close and on unmount', async () => {
      const add = vi.spyOn(document, 'addEventListener')
      const remove = vi.spyOn(document, 'removeEventListener')
      const ours = ['keydown', 'pointerdown']
      const count = (spy: typeof add) => spy.mock.calls.filter(([t]) => ours.includes(t)).length

      await renderWithRouter(<Layout><p>outside</p></Layout>, { initialPath: '/' })
      expect(count(add)).toBe(0)

      fireEvent.click(closedButton())
      expect(count(add)).toBe(2)
      expect(count(remove)).toBe(0)

      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
      expect(count(remove)).toBe(2)

      fireEvent.click(closedButton())
      expect(count(add)).toBe(4)
      cleanup()
      expect(count(remove)).toBe(4)
    })
  })
})

import { act, cleanup, fireEvent, screen } from '@testing-library/react'
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
  // jsdom has no matchMedia; default to a no-op stub.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Layout', () => {
  describe('landmarks', () => {
    it('wraps the route content in the main landmark', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      expect(screen.getByRole('main')).toHaveTextContent('content')
    })

    it('makes main the focusable skip target', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      const main = screen.getByRole('main')
      expect(main).toHaveAttribute('id', 'main')
      expect(main).toHaveAttribute('tabindex', '-1')
    })

    it('renders a skip link to main as the first focusable element', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      const skip = screen.getByRole('link', { name: 'Skip to content' })
      expect(skip).toHaveAttribute('href', '#main')
      const focusable = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      expect(focusable[0]).toBe(skip)
    })

    it('labels the site navigation', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    })
  })

  it('renders the project nav on the portfolio home', async () => {
    await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

    expect(screen.getByRole('link', { name: 'Bourbon Dojo' })).toBeInTheDocument()
  })

  it.each(['/panda-jump', '/panda-jump/privacy'])(
    'renders no links to other projects on %s, but keeps the skip link and main',
    async (path) => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: path })

      expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
      expect(screen.getByRole('main')).toHaveTextContent('content')

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

  describe('closing the mobile menu on navigation', () => {
    async function renderOpen() {
      const result = await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
      return result
    }

    function expectClosed() {
      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    }

    it.each(['Home', 'Projects', 'Bourbon Dojo'])('closes when the %s link is activated', async (name) => {
      await renderOpen()

      await act(async () => {
        fireEvent.click(screen.getByRole('link', { name }))
      })

      expectClosed()
    })

    it('closes on a hash-only location change', async () => {
      const { router } = await renderOpen()

      await act(() => router.navigate({ to: '/', hash: 'about' }))

      expectClosed()
    })

    it('closes on a pathname change', async () => {
      const { router } = await renderOpen()

      await act(() => router.navigate({ to: '/bourbon-dojo' }))

      expectClosed()
    })

    it('stays closed when navigating while closed', async () => {
      const { router } = await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      await act(() => router.navigate({ to: '/', hash: 'about' }))

      expectClosed()
    })
  })

  describe('scrolled state', () => {
    const nav = () => screen.getByRole('navigation')
    function scrollTo(y: number) {
      Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true })
      act(() => {
        fireEvent.scroll(window)
      })
    }

    beforeEach(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true })
    })

    it('keeps scrolled after opening and closing the menu', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      scrollTo(100)
      expect(nav()).toHaveClass('scrolled')

      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(nav()).toHaveClass('scrolled', 'menu-open')

      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
      expect(nav()).toHaveClass('scrolled')
      expect(nav()).not.toHaveClass('menu-open')
    })

    it('keeps scrolled after closing with Escape', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      scrollTo(100)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(nav()).toHaveClass('scrolled')
    })

    it('is not scrolled at or below 60 after closing the menu', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      scrollTo(60)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))

      expect(nav()).not.toHaveClass('scrolled')
    })

    it('becomes scrolled just above 60 and clears when scrolling back', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      scrollTo(61)
      expect(nav()).toHaveClass('scrolled')
      scrollTo(10)
      expect(nav()).not.toHaveClass('scrolled')
    })

    it('initialises from the current scroll position on mount', async () => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true, writable: true })
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      expect(nav()).toHaveClass('scrolled')
    })

    it('uses a passive scroll listener and removes it on unmount', async () => {
      const add = vi.spyOn(window, 'addEventListener')
      const remove = vi.spyOn(window, 'removeEventListener')
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })

      const added = add.mock.calls.find(([t]) => t === 'scroll')
      expect(added?.[2]).toEqual({ passive: true })

      cleanup()
      expect(remove.mock.calls.some(([t, fn]) => t === 'scroll' && fn === added?.[1])).toBe(true)
    })
  })

  describe('closing the mobile menu at desktop width', () => {
    type Listener = (e: { matches: boolean }) => void
    let listeners: Set<Listener>
    let addSpy: ReturnType<typeof vi.fn>
    let removeSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
      listeners = new Set()
      addSpy = vi.fn((_t: string, fn: Listener) => listeners.add(fn))
      removeSpy = vi.fn((_t: string, fn: Listener) => listeners.delete(fn))
      // Only the menu's width query is spied on; the starfield's reduced-motion
      // query gets inert listeners so it doesn't count here.
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: query === '(min-width: 900px)' ? addSpy : () => {},
        removeEventListener: query === '(min-width: 900px)' ? removeSpy : () => {},
      })) as unknown as typeof window.matchMedia
    })

    const cross = (matches: boolean) =>
      act(() => {
        listeners.forEach((fn) => fn({ matches }))
      })

    it('closes when the viewport reaches 900px while open', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 900px)')

      cross(true)

      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByRole('navigation')).not.toHaveClass('menu-open')
    })

    it('stays open when the query change reports it no longer matches', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))

      cross(false)

      expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    })

    it('removes the listener on close and on unmount', async () => {
      await renderWithRouter(<Layout>content</Layout>, { initialPath: '/' })
      expect(addSpy).not.toHaveBeenCalled()

      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(addSpy).toHaveBeenCalledTimes(1)
      expect(removeSpy).not.toHaveBeenCalled()

      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
      expect(removeSpy).toHaveBeenCalledTimes(1)

      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(addSpy).toHaveBeenCalledTimes(2)
      cleanup()
      expect(removeSpy).toHaveBeenCalledTimes(2)
    })
  })
})

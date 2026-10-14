import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '../test-utils'
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
      expect(screen.getByText('content')).toBeInTheDocument()
    },
  )
})

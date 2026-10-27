import { act, cleanup, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import indexHtml from '../../index.html?raw'
import { renderRoute } from '../test-utils'

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
  } as unknown as CanvasRenderingContext2D)
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
  document.title = ''
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('page titles', () => {
  it('titles the home page with the owner name', async () => {
    await renderRoute('/')

    await waitFor(() => expect(document.title).toBe('Ryan K Olsen — RKO Design'))
  })
})

describe('page titles per route', () => {
  it.each([
    ['/', 'Ryan K Olsen — RKO Design'],
    ['/bourbon-dojo', 'Bourbon Dojo — RKO Design'],
    ['/bourbon-dojo/privacy', 'Bourbon Dojo Privacy Policy — RKO Design'],
    ['/panda-jump', 'Panda Jump — RKO Design'],
    ['/panda-jump/privacy', 'Panda Jump Privacy Policy — RKO Design'],
    ['/wizard-kittenz', 'Wizard Kittenz — RKO Design'],
    ['/wizard-kittenz/privacy', 'Wizard Kittenz Privacy Policy — RKO Design'],
  ])('%s is titled "%s"', async (path, title) => {
    await renderRoute(path)

    await waitFor(() => expect(document.title).toBe(title))
  })

  it('updates the title on client-side navigation', async () => {
    const { router } = await renderRoute('/bourbon-dojo')
    await waitFor(() => expect(document.title).toBe('Bourbon Dojo — RKO Design'))

    await act(() => router.navigate({ to: '/bourbon-dojo/privacy' }))

    await waitFor(() => expect(document.title).toBe('Bourbon Dojo Privacy Policy — RKO Design'))
  })

  it('uses the home title in the HTML shell before the app loads', () => {
    expect(indexHtml).toContain('<title>Ryan K Olsen — RKO Design</title>')
    expect(indexHtml).not.toContain('Kolsen')
  })
})

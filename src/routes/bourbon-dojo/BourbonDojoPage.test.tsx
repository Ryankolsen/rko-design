import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import pageSource from './index.tsx?raw'
import { BourbonDojoPage } from './index'

afterEach(cleanup)

const render = () => renderWithRouter(<BourbonDojoPage />, { initialPath: '/bourbon-dojo' })

describe('BourbonDojoPage', () => {
  it('does not mention the old 0–100 score', async () => {
    await render()
    expect(screen.queryByText(/0–100/)).toBeNull()
  })

  it('describes 1-5 star ratings with nose, palate and finish notes', async () => {
    await render()
    expect(screen.getByText(/1 to 5 stars|1–5 star/i)).toBeTruthy()
    expect(screen.getByText(/nose, palate/i)).toBeTruthy()
  })

  it('mentions the social feed and achievements without a fixed count', async () => {
    await render()
    expect(screen.getByText(/dozens of achievements/i)).toBeTruthy()
    expect(screen.queryByText(/\d+ achievements/i)).toBeNull()
    expect(screen.getAllByText(/follow|feed/i).length).toBeGreaterThan(0)
  })

  it.each([
    ['Download on the App Store (opens in new tab)', 'https://apps.apple.com/us/app/bourbon-dojo/id6762319810'],
    [
      'Get it on Google Play (opens in new tab)',
      'https://play.google.com/store/apps/details?id=com.ryankolsen.bourbondojo&hl=en_US',
    ],
  ])('links %s safely in a new tab with its original href', async (name, href) => {
    await render()
    const link = screen.getByRole('link', { name })
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('uses the shared StoreBadge instead of its own badge markup', () => {
    expect(pageSource).not.toContain('function AppleButton')
    expect(pageSource).not.toContain('function GooglePlayButton')
    expect(pageSource).not.toContain('target="_blank"')
  })

  it('links Contact to the RKO Design email', async () => {
    await render()
    expect(screen.getByRole('link', { name: 'Contact' }).getAttribute('href')).toBe(
      'mailto:rkolsen.design@gmail.com',
    )
  })
})

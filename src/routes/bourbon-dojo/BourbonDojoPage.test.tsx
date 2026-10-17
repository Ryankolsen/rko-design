import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
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

  it('mentions the social feed and 40 achievements', async () => {
    await render()
    expect(screen.getByText(/40 achievements/i)).toBeTruthy()
    expect(screen.getAllByText(/follow|feed/i).length).toBeGreaterThan(0)
  })

  it('keeps the App Store link unchanged', async () => {
    await render()
    expect(screen.getByRole('link', { name: /download on the app store/i }).getAttribute('href')).toBe(
      'https://apps.apple.com/us/app/bourbon-dojo/id6762319810',
    )
  })
})

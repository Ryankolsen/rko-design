import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import pandaJumpCss from './panda-jump.css?raw'
import { PandaJumpPage } from './index'

afterEach(cleanup)

const render = () => renderWithRouter(<PandaJumpPage />, { initialPath: '/panda-jump' })

describe('PandaJumpPage', () => {
  it('wears the Panda Jump theme', async () => {
    const { container } = await render()
    expect(container.querySelector('.pj-page')).toHaveClass('theme-pj')
  })

  // Google Play Families policy: no links to the site's other projects.
  it('stays navless with no links to other projects', async () => {
    await render()
    expect(screen.queryByRole('navigation')).toBeNull()
    expect(screen.queryByRole('link', { name: /Bourbon Dojo|Wizard Kittenz/ })).toBeNull()
  })
})

describe('Panda Jump styles', () => {
  it('drops the failing pink and grey', () => {
    expect(pandaJumpCss).not.toMatch(/#d94f7a/i)
    expect(pandaJumpCss).not.toMatch(/#6b7a66/i)
  })

  it('uses the green only as a token value', () => {
    const lines = pandaJumpCss.split('\n').filter((line) => /#3f7a34/i.test(line))
    expect(lines.length).toBeGreaterThan(0)
    for (const line of lines) expect(line.trim()).toMatch(/^--[\w-]+:/)
  })

  it('underlines the footer link at rest and keeps it readable in size', () => {
    const rule = pandaJumpCss.match(/\.pj-footer a\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).not.toMatch(/text-decoration:\s*none/)
    const footer = pandaJumpCss.match(/\.pj-footer\s*\{([^}]*)\}/)![1] + rule![1]
    const sizes = [...footer.matchAll(/font-size:\s*([\d.]+)rem/g)].map((m) => Number(m[1]))
    expect(sizes.at(-1)).toBeGreaterThanOrEqual(0.875)
  })
})

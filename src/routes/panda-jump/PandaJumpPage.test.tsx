import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../test-utils'
import { resolveTheme } from '../../a11y/themeTokens'
import baseCss from '../../styles/base.css?raw'
import tokensCss from '../../styles/tokens.css?raw'
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

  it('uses the shared footer, with the link underlined at rest and readable in size', async () => {
    await render()
    expect(screen.getByRole('contentinfo')).toHaveClass('app-footer')
    const rule = baseCss.match(/\.app-footer a\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    expect(rule![1]).toMatch(/text-decoration:\s*underline/)
    const tokens = resolveTheme([tokensCss], ':root')
    const footer = (baseCss.match(/\.app-footer\s*\{([^}]*)\}/)![1] + rule![1]).replace(
      /var\((--[\w-]+)\)/g,
      (_, name: string) => tokens[name],
    )
    const sizes = [...footer.matchAll(/font-size:\s*([\d.]+)rem/g)].map((m) => Number(m[1]))
    expect(sizes.at(-1)).toBeGreaterThanOrEqual(0.875)
  })
})

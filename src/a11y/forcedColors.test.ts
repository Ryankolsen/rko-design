import { describe, expect, it } from 'vitest'
import bourbonDojoCss from '../routes/bourbon-dojo/bourbon-dojo.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'

// Gradient text is drawn with background-clip and a transparent fill, which
// can vanish in forced-colors mode or where background-clip: text is missing.
describe.each([
  { sheet: 'bourbon-dojo.css', css: bourbonDojoCss, selector: '.bd-app-name' },
  { sheet: 'wizard-kittenz.css', css: wizardKittenzCss, selector: '.wk-page h1' },
])('$sheet gradient heading', ({ css, selector }) => {
  it('falls back to CanvasText in forced-colors mode', () => {
    const block = css.match(/@media \(forced-colors: active\)\s*\{([\s\S]*?\}\s*)\}/)
    expect(block).not.toBeNull()
    expect(block![1]).toContain(selector)
    expect(block![1]).toMatch(/-webkit-text-fill-color:\s*CanvasText/)
    expect(block![1]).toMatch(/[^-]color:\s*CanvasText/)
    expect(block![1]).toMatch(/background:\s*none/)
  })

  it('declares a solid color before the transparent fill', () => {
    const escaped = selector.replace(/\./g, '\\.')
    const rule = css.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`))
    expect(rule).not.toBeNull()
    const body = rule![1]
    const color = body.search(/(^|[^-])color:/)
    expect(color).toBeGreaterThanOrEqual(0)
    expect(color).toBeLessThan(body.indexOf('-webkit-text-fill-color'))
  })
})

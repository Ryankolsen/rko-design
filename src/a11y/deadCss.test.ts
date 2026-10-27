import { describe, expect, it } from 'vitest'
import bourbonDojoCss from '../routes/bourbon-dojo/bourbon-dojo.css?raw'
import pandaJumpCss from '../routes/panda-jump/panda-jump.css?raw'
import wizardKittenzCss from '../routes/wizard-kittenz/wizard-kittenz.css?raw'
import siteCss from '../styles/base.css?raw'

// Pages are built one way; nothing renders these any more.
describe('dead code', () => {
  it('has no styles from the deleted AppLandingPage block', () => {
    for (const name of ['.app-page', '.app-hero', '.app-feature', '.app-store-row']) {
      expect(siteCss).not.toContain(name)
    }
  })

  it('has no unused back-link or store badge variants', () => {
    expect(pandaJumpCss).not.toContain('.pj-back')
    expect(wizardKittenzCss).not.toContain('.wk-back')
    expect(siteCss).not.toContain('.store-btn.android-soon')
    expect(siteCss).not.toContain('.store-btn.dev')
    expect(bourbonDojoCss).not.toContain('.bd-store-btn')
  })

  it('has no shared AppLandingPage component', () => {
    expect(Object.keys(import.meta.glob('../components/AppLandingPage.tsx'))).toEqual([])
  })
})

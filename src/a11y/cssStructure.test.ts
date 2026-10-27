import { describe, expect, it } from 'vitest'

describe('stylesheet layout', () => {
  it('keeps shared rules in styles/base.css, not the old style.css', () => {
    expect(Object.keys(import.meta.glob('../styles/base.css', { query: '?raw' }))).toHaveLength(1)
    expect(Object.keys(import.meta.glob('../style.css', { query: '?raw' }))).toHaveLength(0)
  })
})

import { describe, expect, it } from 'vitest'
import { composite, contrastRatio, meetsWcag, parseColor } from './contrast'

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 2)
  })

  it('is about 4.54 for #767676 on white', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2)
  })

  it('is 1 for identical colors', () => {
    expect(contrastRatio('#fff', '#fff')).toBe(1)
  })

  it('is symmetric for opaque colors', () => {
    expect(contrastRatio('#f0a835', '#060812')).toBeCloseTo(contrastRatio('#060812', '#f0a835'), 10)
  })
})

describe('parseColor', () => {
  it('expands 3-digit hex to the same color as 6-digit hex', () => {
    expect(parseColor('#abc')).toEqual(parseColor('#aabbcc'))
    expect(parseColor('#aabbcc')).toEqual({ r: 170, g: 187, b: 204, a: 1 })
  })

  it('reads alpha from 8-digit hex', () => {
    const { r, g, b, a } = parseColor('#00000080')
    expect({ r, g, b }).toEqual({ r: 0, g: 0, b: 0 })
    expect(a).toBeCloseTo(0.5, 2)
  })
})

describe('parseColor rgb()', () => {
  it.each([
    ['rgba(240,168,53,0.3)', { r: 240, g: 168, b: 53, a: 0.3 }],
    ['rgb(240 168 53 / 0.3)', { r: 240, g: 168, b: 53, a: 0.3 }],
    ['rgb(240,168,53)', { r: 240, g: 168, b: 53, a: 1 }],
    ['rgba(240, 168, 53, 0.3)', { r: 240, g: 168, b: 53, a: 0.3 }],
  ])('parses %s', (input, expected) => {
    expect(parseColor(input)).toEqual(expected)
  })
})

describe('composite', () => {
  it('lays 50% black over white to mid grey', () => {
    const { r, g, b, a } = composite(parseColor('rgba(0,0,0,0.5)'), parseColor('#ffffff'))
    for (const c of [r, g, b]) expect(Math.abs(c - 128)).toBeLessThanOrEqual(1)
    expect(a).toBe(1)
  })
})

describe('contrastRatio with translucent colors', () => {
  it('composites a translucent foreground over the background first', () => {
    const grey = composite(parseColor('rgba(0,0,0,0.5)'), parseColor('#ffffff'))
    expect(contrastRatio('rgba(0,0,0,0.5)', '#ffffff')).toBeCloseTo(contrastRatio(grey, '#ffffff'), 10)
    expect(contrastRatio('rgba(0,0,0,0.5)', '#ffffff')).toBeCloseTo(3.98, 1)
  })

  it('is 1 for a fully transparent foreground', () => {
    expect(contrastRatio('rgba(0,0,0,0)', '#336699')).toBeCloseTo(1, 10)
  })

  it('throws for a translucent background', () => {
    expect(() => contrastRatio('#000', 'rgba(255,255,255,0.5)')).toThrow(/opaque/)
  })
})

describe('invalid input', () => {
  it.each(['not-a-color', 'red', 'hsl(0 0% 0%)', '#12345'])('throws on %s', (input) => {
    expect(() => parseColor(input)).toThrow()
  })
})

describe('meetsWcag', () => {
  it.each([
    [4.49, 'text', false],
    [4.5, 'text', true],
    [2.99, 'large', false],
    [3, 'large', true],
    [2.99, 'non-text', false],
    [3, 'non-text', true],
  ] as const)('%d for %s is %s', (ratio, level, expected) => {
    expect(meetsWcag(ratio, level)).toBe(expected)
  })
})

// WCAG 2.x contrast maths. Pure: no DOM, so tests can check stylesheet colors directly.

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const RGB = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+)\s*)?\)$/i

export function parseColor(input: string): Color {
  const value = input.trim()

  const rgb = RGB.exec(value)
  if (rgb) {
    const [r, g, b] = rgb.slice(1, 4).map(Number)
    return { r, g, b, a: rgb[4] === undefined ? 1 : Number(rgb[4]) }
  }

  const hex = HEX.exec(value)?.[1]
  if (!hex) throw new Error(`Unsupported color: ${input}`)
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
    a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
  }
}

function channel(value: number): number {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance({ r, g, b }: Color): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const toColor = (c: string | Color): Color => (typeof c === 'string' ? parseColor(c) : c)

/** The opaque color seen when `fg` is laid over an opaque `bg`. */
export function composite(fg: Color, bg: Color): Color {
  const mix = (f: number, b: number) => f * fg.a + b * (1 - fg.a)
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a: 1 }
}

export function contrastRatio(fg: string | Color, bg: string | Color): number {
  const back = toColor(bg)
  if (back.a < 1) throw new Error('contrastRatio needs an opaque background')
  const front = composite(toColor(fg), back)
  const l1 = luminance(front)
  const l2 = luminance(back)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

export type WcagLevel = 'text' | 'large' | 'non-text'

const THRESHOLDS: Record<WcagLevel, number> = { text: 4.5, large: 3, 'non-text': 3 }

export function meetsWcag(ratio: number, level: WcagLevel): boolean {
  return ratio >= THRESHOLDS[level]
}

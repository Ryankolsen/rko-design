import { describe, expect, it } from 'vitest'
import { interests } from './interests'

describe('interests', () => {
  it('is non-empty', () => {
    expect(interests.length).toBeGreaterThan(0)
  })

  it('is sorted alphabetically (case-insensitive)', () => {
    const sorted = [...interests].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' }),
    )
    expect(interests).toEqual(sorted)
  })
})

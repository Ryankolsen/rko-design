import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('test harness smoke check', () => {
  it('renders with React Testing Library and jest-dom matchers wired', () => {
    render(<div data-testid="x">ok</div>)
    expect(screen.getByTestId('x')).toBeInTheDocument()
  })
})

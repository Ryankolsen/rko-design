import { Link } from '@tanstack/react-router'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithRouter } from './test-utils'

describe('renderWithRouter', () => {
  it('renders a component using TanStack Router Link without throwing', async () => {
    await renderWithRouter(<Link to="/bourbon-dojo">Go</Link>)

    const link = screen.getByRole('link', { name: 'Go' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/bourbon-dojo')
  })
})

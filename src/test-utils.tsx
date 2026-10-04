import { act, render, type RenderResult } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface RenderWithRouterOptions {
  initialPath?: string
}

export async function renderWithRouter(
  ui: ReactNode,
  { initialPath = '/' }: RenderWithRouterOptions = {},
): Promise<RenderResult> {
  const rootRoute = createRootRoute({
    component: () => <>{ui}</>,
  })

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })

  await router.load()

  let result!: RenderResult
  await act(async () => {
    result = render(<RouterProvider router={router} />)
  })

  return result
}

import { act, render, type RenderResult } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { routeTree } from './routeTree.gen'

interface RenderWithRouterOptions {
  initialPath?: string
}

function createTestRouter(ui: ReactNode, initialPath: string) {
  const rootRoute = createRootRoute({
    component: () => <>{ui}</>,
  })

  return createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })
}

export async function renderWithRouter(
  ui: ReactNode,
  { initialPath = '/' }: RenderWithRouterOptions = {},
): Promise<RenderResult & { router: ReturnType<typeof createTestRouter> }> {
  const router = createTestRouter(ui, initialPath)

  await router.load()

  let result!: RenderResult
  await act(async () => {
    result = render(<RouterProvider router={router} />)
  })

  return Object.assign(result, { router })
}

/** Renders `path` through the app's real route tree, Layout included. */
export async function renderRoute(path: string) {
  const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: [path] }) })

  await router.load()

  let result!: RenderResult
  await act(async () => {
    result = render(<RouterProvider router={router} />)
  })

  return Object.assign(result, { router })
}

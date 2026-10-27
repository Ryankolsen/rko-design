import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { Layout } from '../components/Layout'

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
    </>
  ),
})

import { RefObject } from 'react'
import { Navigate, RouteObject, createHashRouter } from 'react-router-dom'
import questionRoutes from './question'
import userRoutes from './user'
import AppRoutes from '@/components/AppRoutes'
import NoMatch from '@/components/NoMatch'

export type RouteItem = RouteObject & { nodeRef: RefObject<any> }

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/question' />
  },
  {
    path: '/question',
    element: <AppRoutes routes={questionRoutes} />,
    children: questionRoutes.map(route => ({
      index: route.path === 'list',
      path: route.path === 'list' ? undefined : route.path,
      element: route.element
    }))
  },
  {
    path: '/user',
    element: <AppRoutes routes={userRoutes} />,
    children: userRoutes.map(route => ({
      index: route.path === 'list',
      path: route.path === 'list' ? undefined : route.path,
      element: route.element
    }))
  },
  {
    path: '*',
    element: <NoMatch />
  }
])

export default router

import { createRef } from 'react'
import { RouteItem } from './index'
import UserList from '@/pages/user/list'
import UserManager from '@/pages/user/manager'
import Permission from '@/pages/user/permission'

const userRoutes: RouteItem[] = [
  {
    path: 'list',
    element: <UserList />,
    nodeRef: createRef()
  },
  {
    path: 'manager',
    element: <UserManager />,
    nodeRef: createRef()
  },
  {
    path: 'permission',
    element: <Permission />,
    nodeRef: createRef()
  }
]

export default userRoutes

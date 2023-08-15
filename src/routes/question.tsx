import { createRef } from 'react'
import { RouteItem } from './index'
import QuestionList from '@/pages/question/list'
import QuestionCreate from '@/pages/question/create'
import QuestionManager from '@/pages/question/manager'

const questionRoutes: RouteItem[] = [
  {
    path: 'list',
    element: <QuestionList />,
    nodeRef: createRef()
  },
  {
    path: 'create',
    element: <QuestionCreate />,
    nodeRef: createRef()
  },
  {
    path: 'manager',
    element: <QuestionManager />,
    nodeRef: createRef()
  }
]

export default questionRoutes

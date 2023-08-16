import { PropsWithChildren } from 'react'
import useAuth from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function WithAuth(props: PropsWithChildren<any>) {
  const { isLogin } = useAuth()

  return isLogin ? <>{props.children}</> : <Navigate to='/login' />
}

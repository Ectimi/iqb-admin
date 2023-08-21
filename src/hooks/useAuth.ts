import { useState } from 'react'
import storage from '@/lib/storage'

export default function useAuth() {
  const [isLogin, setIsLogin] = useState(
    !!storage.getItem('access_token') || storage.getItem('refresh_token')
  )
  const setToken = (value: string | null) => {
    setIsLogin(!!value)
    if (value) {
      storage.setItem('access_token', value)
    } else {
      storage.removeItem('access_token')
    }
  }

  return {
    isLogin,
    setToken
  }
}

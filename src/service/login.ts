import request from '@/lib/request'
import storage from '@/lib/storage'

interface UserInfoModel {
  userInfo: {
    id: number
    username: string
    nickName: string
    isForzen: boolean
    headPic: string
    email: string
    createTime: string
    roles: string[]
    permissions: Array<{ id: number; name: string }>
  }
  accessToken: string
  refreshToken: string
}

interface RefreshModel {
  access_token: string
  refresh_token: string
}

interface LoginParams {
  type: 'password' | 'code'
  username?: string
  password?: string
  email?: string
  captcha?: string
}

export function UserLogin(payload: LoginParams) {
  const params =
    payload.type === 'password'
      ? { username: payload.username, password: payload.password }
      : { email: payload.email, captcha: payload.captcha }

  return request.post<UserInfoModel>(
    '/user/login',
    { ...params, type: payload.type },
    {
      requestOptions: { globalSuccessMessage: true }
    }
  )
}

export function RefreshToken() {
  return request.get<RefreshModel>('/user/refresh', {
    params: { refresh_token: storage.getItem('refresh_token') }
  })
}

export function SendCaptcha(email: string) {
  return request.get('/email/code', {
    params: { type: 'Login', email },
    requestOptions: { globalSuccessMessage: true }
  })
}

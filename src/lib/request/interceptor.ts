import { InterceptorHooks, ExpandAxiosResponse } from './types'
import { message } from 'antd'
import storage from '../storage'
import { RefreshToken } from '@/service/login'
import Request from './Request'

// 与后端约定的请求成功码
const SUCCESS_CODE = 0
// 与后端约定的token无效或过期码
const TOKEN_INVALID = 10002

export const transform: InterceptorHooks = {
  requestInterceptor(config) {
    const notNeedTokenUrls = ['/user/login', '/user/refresh']
    const needToken = !notNeedTokenUrls.includes(config.url as string)

    if (needToken) {
      const access_token = storage.getItem('access_token')
      config!.headers!.authorization = 'bearer ' + access_token
    }

    return config
  },

  requestInterceptorCatch(err) {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(err)
  },

  async responseInterceptor(result) {
    const res = result as ExpandAxiosResponse
    const { data, config } = res

    if (res.status >= 300 || res.status < 200) {
      return Promise.reject(res)
    } else if (res.data.code !== SUCCESS_CODE || !res.data.success) {
      if (data.code === TOKEN_INVALID && !config.url!.includes('/user/refresh')) {
        const refreshResult = await RefreshToken()
        if (refreshResult.code === SUCCESS_CODE) {
          storage.setItem('access_token', refreshResult.data.access_token.split(' ')[1])
          storage.setItem('refresh_token', refreshResult.data.refresh_token.split(' ')[1])

          return (this as Request).request(config)
        } else {
          message.error('token无效或已过期，请重新登录')
          storage.removeItem('access_token')
          storage.removeItem('refresh_token')
          return Promise.reject(data)
        }
      } else {
        if (config.requestOptions?.globalErrorMessage) {
          const errMsg = res.data.message || '未知错误'
          message.error(errMsg)
        }
        return Promise.reject(res.data)
      }
    } else if (config.requestOptions?.globalSuccessMessage) {
      const successMsg = res.data.message || '操作成功'
      message.success(successMsg)
    }

    return res.data
  },

  async responseInterceptorCatch(err) {
    // 这里用来处理 http 常见错误，进行全局提示
    const mapErrorStatus = new Map([
      [400, '请求方式错误'],
      [401, '请重新登录'],
      [403, '拒绝访问'],
      [404, '请求地址有误'],
      [500, '服务器出错']
    ])
    const errMsg = mapErrorStatus.get(err.response.status) || '请求出错，请稍后再试'
    message.error(errMsg)
    return Promise.reject(err.response)
  }
}

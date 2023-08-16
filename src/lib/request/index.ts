import Request from './Request'
import { transform } from './interceptor'

// 具体使用时先实例一个请求对象
const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  interceptorHooks: transform
})

export default request

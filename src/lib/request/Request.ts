import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { InterceptorHooks, ExpandAxiosRequestConfig, BaseApiResponse } from './types'

export default class Request {
  // axios 实例
  private _instance: AxiosInstance
  // 默认配置
  private _defaultConfig: ExpandAxiosRequestConfig = {
    baseURL: '/api',
    timeout: 5000,
    requestOptions: {
      globalErrorMessage: true,
      globalSuccessMessage: false
    }
  }
  private _interceptorHooks?: InterceptorHooks

  constructor(config: ExpandAxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this._instance = axios.create(Object.assign(this._defaultConfig, config))
    this._interceptorHooks = config.interceptorHooks
    this.setupInterceptors()
  }

  // 通用拦截，在初始化时就进行注册和运行，对基础属性进行处理
  private setupInterceptors() {
    this._instance.interceptors.request.use(
      this._interceptorHooks?.requestInterceptor,
      this._interceptorHooks?.requestInterceptorCatch
    )
    this._instance.interceptors.response.use(
      this._interceptorHooks?.responseInterceptor?.bind(this),
      this._interceptorHooks?.responseInterceptorCatch?.bind(this)
    )
  }

  public request<T = any>(config: ExpandAxiosRequestConfig): Promise<BaseApiResponse<T>> {
    return this._instance.request(config)
  }

  public get<T = any>(url: string, config?: ExpandAxiosRequestConfig): Promise<BaseApiResponse<T>> {
    return this._instance.get(url, config)
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig
  ): Promise<BaseApiResponse<T>> {
    return this._instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig
  ): Promise<BaseApiResponse<T>> {
    return this._instance.put(url, data, config)
  }

  public delete<T = any>(
    url: string,
    config?: ExpandAxiosRequestConfig
  ): Promise<BaseApiResponse<T>> {
    return this._instance.delete(url, config)
  }
}

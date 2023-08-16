import { encrypt, decrypt } from './crypto'

interface IConfig {
  type?: 'localStorage' | 'sessionStorage'
  prefix?: string
  expire?: number
  isEncrypt?: boolean
}

type TKey = string

export class IStroage {
  private defaultConfig: IConfig = {
    type: 'localStorage', // 本地存储类型 sessionStorage
    prefix: 'IQB_1.0.0', // 名称前缀 建议：项目名 + 项目版本
    expire: 60 * 60 * 24 * 30, //过期时间 单位：秒
    isEncrypt: true // 默认加密 为了调试方便, 开发过程中可以不加密
  }

  config: IConfig
  originalStorage: Storage

  constructor(config: IConfig = {}) {
    this.config = { ...this.defaultConfig, ...config }
    this.originalStorage = window[this.config.type!]
  }

  setItem = (key: TKey, value: any, expire = 0) => {
    if (value === '' || value === null || value === undefined) {
      value = null
    }

    if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number')

    expire = expire ? expire : this.config.expire!
    const data = {
      value: value, // 存储值
      time: Date.now(), //存值时间戳
      expire: expire // 过期时间
    }

    const encryptString = this.config.isEncrypt
      ? encrypt(JSON.stringify(data))
      : JSON.stringify(data)

    this.originalStorage.setItem(this.autoAddPrefix(key), encryptString)
  }

  getItem = (key: TKey) => {
    key = this.autoAddPrefix(key)
    // key 不存在判断
    if (
      !this.originalStorage.getItem(key) ||
      JSON.stringify(this.originalStorage.getItem(key)) === 'null'
    ) {
      return null
    }

    // 优化 持续使用中续期
    const storage = this.config.isEncrypt
      ? JSON.parse(decrypt(this.originalStorage.getItem(key)))
      : JSON.parse(this.originalStorage.getItem(key)!)

    const nowTime = Date.now()

    // 过期删除
    if (storage.expire && this.config.expire! < nowTime - storage.time) {
      this.removeItem(key)
      return null
    } else {
      // 未过期期间被调用 则自动续期 进行保活
      this.setItem(this.autoRemovePrefix(key), storage.value)
      return storage.value
    }
  }

  removeItem = (key: TKey) => {
    this.originalStorage.removeItem(this.autoAddPrefix(key))
  }

  clear = () => {
    this.originalStorage.clear()
  }

  autoAddPrefix = (key: TKey) => {
    const prefix = this.config.prefix ? this.config.prefix + '_' : ''
    return prefix + key
  }

  autoRemovePrefix = (key: TKey) => {
    const len = this.config.prefix ? this.config.prefix.length + 1 : ''
    return len ? key.substring(len) : key
  }
}

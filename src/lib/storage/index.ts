import { IStroage } from './Storage'

const storage = new IStroage({ isEncrypt: import.meta.env.DEV ? false : true, prefix: 'IQB_1.0.0' })

export default storage

import { IStroage } from './Storage'

const storage = new IStroage({ isEncrypt: import.meta.env.DEV ? false : true })

export default storage

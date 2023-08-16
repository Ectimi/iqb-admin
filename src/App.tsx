import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'

dayjs.locale('zh-cn')

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider locale={zhCN}>
        <div className='App'>
          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </I18nextProvider>
  )
}

export default App

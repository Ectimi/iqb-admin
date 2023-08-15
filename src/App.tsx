import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'

dayjs.locale('zh-cn')

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  )
}

export default App

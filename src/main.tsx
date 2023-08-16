import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Alert } from 'antd'
import '@/assets/styles/reset.css'
import '@/assets/styles/global.less'

const { ErrorBoundary } = Alert

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

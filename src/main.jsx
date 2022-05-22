import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './contexts/AuthContext'
import './index.css'
import AppRouter from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import AppRouter from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
      <ToastContainer autoClose = {3000} />
    </AuthProvider>
  </React.StrictMode>
)

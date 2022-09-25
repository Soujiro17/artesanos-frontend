import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import AppRouter from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 2000
    }
  }
})

if (import.meta.env.VITE_NODE_ENV === 'production') {
  disableReactDevTools()
}

const rootContainer = document.getElementById('root')

const render = ReactDOM.createRoot(rootContainer)

render.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppRouter />
      <ToastContainer autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  </QueryClientProvider>
)

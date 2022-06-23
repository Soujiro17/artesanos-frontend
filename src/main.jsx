import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AppRouter from './routes'
import APIProvider from './contexts/API'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 2000
    }
  }
})

const rootContainer = document.getElementById('root')

const render = ReactDOM.createRoot(rootContainer)

render.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <APIProvider>
          <AppRouter />
          <ToastContainer autoClose={3000} />
          {
            import.meta.env.DEV && <ReactQueryDevtools />
          }
        </APIProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

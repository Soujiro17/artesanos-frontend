import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Spinner } from '../components'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { axiosPublic } from '../services/axios'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const axiosPrivate = useAxiosPrivate()

  const basePath = '/auth'

  const login = async (user) => {
    const { data } = await axiosPublic.post(`${basePath}/login`, user)

    if (data?.token) {
      setAuth(data)
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', data?.token)
    }
    return data
  }

  const getLoggedIn = async () => {
    const { data } = await axiosPrivate(`${basePath}/loggedIn`)

    if (data?.user) { setAuth(data?.user) }

    return data
  }

  const cerrarSesion = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('token')
    setAuth(null)
  }

  const { isLoading } = useQuery('loggedIn', () => getLoggedIn())

  if (isLoading) return <Spinner fullScreen />

  return (
    <AuthContext.Provider value={{ auth, login, getLoggedIn, cerrarSesion }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

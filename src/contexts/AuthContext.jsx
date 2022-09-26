import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import { axiosPublic } from '../services/axios'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const axiosPrivate = useAxiosPrivate()

  const login = async (user) => {
    const { data } = await axiosPublic.post('/auth', user)

    if (data?.accessToken) {
      setAuth(data.accessToken)
    }

    return data
  }

  const cerrarSesion = async () => {
    const { data } = await axiosPublic.get('/auth/cerrar-sesion')

    setAuth(null)

    return data
  }

  const refresh = async () => {
    const { data } = await axiosPrivate.get('/auth/refresh')

    setAuth(data.accessToken)

    return data.accessToken
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, cerrarSesion, refresh }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

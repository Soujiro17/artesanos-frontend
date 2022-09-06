import React, { useState } from 'react'
import { axiosPublic } from '../services/axios'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const login = async (user) => {
    const { data } = await axiosPublic.post('/auth', user)

    if (data?.accessToken) {
      setAuth(data.accessToken)
    }

    return data
  }

  const cerrarSesion = async () => {
    const { data } = await axiosPublic.get('/auth/cerrar-sesion')

    return data
  }

  return (
    <AuthContext.Provider value={{ auth, login, cerrarSesion }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

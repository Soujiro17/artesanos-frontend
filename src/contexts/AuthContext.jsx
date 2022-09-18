import React, { useState, useEffect } from 'react'

import { axiosPublic } from '../services/axios'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const login = async (user) => {
    const { data } = await axiosPublic.post('/auth', user)

    if (data?.accessToken) {
      setAuth(data.accessToken)
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', data.accessToken)
    }

    return data
  }

  const cerrarSesion = async () => {
    const { data } = await axiosPublic.get('/auth/cerrar-sesion')

    return data
  }

  const refresh = async () => {
    await axiosPublic.get('/auth/refresh', { withCredentials: true })
      .then(res => setAuth(prev => ({ ...prev, accessToken: res.data.accessToken })))
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, cerrarSesion }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

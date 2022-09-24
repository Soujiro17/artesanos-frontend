import { useEffect } from 'react'
import { axiosPrivate } from '../services/axios'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const auth = useAuth()

  // eslint-disable-next-line no-undef

  const token = auth?.auth

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (err) => Promise.reject(err)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config

        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await auth?.refresh()
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }

        return Promise.reject(err)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth?.auth])

  return axiosPrivate
}

export default useAxiosPrivate

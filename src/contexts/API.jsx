
import React, { createContext } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export const ApiContext = createContext({})

const APIProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()

  const getCategorias = async (page = 1, limit = 10) => {
    const { data } = await axiosPrivate.get(`/categoria?page=${page}&limit=${limit}`)

    return data
  }

  const crearCategoria = async (values) => {
    const { data } = await axiosPrivate.post('/categoria', values)

    return data
  }

  const getArtesanos = async (page = 1, limit = 10) => {
    const { data } = await axiosPrivate.get(`/artesano?page=${page}&limit=${limit}`)

    return data
  }

  const getProductoById = async (_id) => {
    const { data } = await axiosPrivate.get(`/producto/${_id}`)

    return data
  }

  const getCategoriaById = async (_id) => {
    const { data } = await axiosPrivate.get(`/categoria/${_id}`)

    return data
  }

  return (
    <ApiContext.Provider value={{
      getCategorias,
      crearCategoria,
      getArtesanos,
      getProductoById,
      getCategoriaById
    }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export default APIProvider

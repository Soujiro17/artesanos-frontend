
import React, { createContext } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { toQuery } from '../utilities/toQuery'

export const ApiContext = createContext({})

const APIProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()

  /* Categorías */

  const getCategorias = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPrivate.get(`/categoria?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const crearCategoria = async ({ values }) => {
    const { data } = await axiosPrivate.post('/categoria', values)

    return data
  }

  const getCategoriaById = async (_id) => {
    const { data } = await axiosPrivate.get(`/categoria/${_id}`)

    return data
  }

  const actualizarCategoria = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/categoria/${_id}`, values)

    return data
  }

  const eliminarCategoria = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/categoria/${_id}`)

    return data
  }

  /* Redes sociales */

  const getRedesSociales = async () => {
    const { data } = await axiosPrivate.get('/red-social')

    return data
  }

  const crearRedSocial = async ({ values }) => {
    const { data } = await axiosPrivate.post('/red-social', values)

    return data
  }

  const actualizarRedSocial = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/red-social/${_id}`, values)

    return data
  }

  const eliminarRedSocial = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/red-social/${_id}`)

    return data
  }

  /* Pymes */

  const getArtesanos = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPrivate.get(`/artesano?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getProductoById = async (_id) => {
    const { data } = await axiosPrivate.get(`/producto/${_id}`)

    return data
  }

  return (
    <ApiContext.Provider value={{
      getCategorias,
      crearCategoria,
      actualizarCategoria,
      eliminarCategoria,

      getRedesSociales,
      crearRedSocial,
      actualizarRedSocial,
      eliminarRedSocial,

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


import React, { createContext } from 'react'
import { useQuery } from 'react-query'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { axiosPublic } from '../services/axios'
import { toQuery } from '../utilities/toQuery'

export const ApiContext = createContext({})

const APIProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()

  /* Categorías */

  const getCategorias = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPublic.get(`/categoria?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getCategoriaById = async (_id) => {
    const { data } = await axiosPublic.get(`/categoria/${_id}`)

    return data
  }

  /* Artesanos */

  const getArtesanos = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPublic.get(`/artesano?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getArtesanoById = async ({ _id }) => {
    const { data } = await axiosPublic.get(`/artesano/${_id}`)

    return data
  }

  const crearArtesano = async ({ values }) => {
    const { data } = await axiosPrivate.post('/artesano', values)

    return data
  }

  const actualizarArtesano = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/artesano/${_id}`, values)

    return data
  }

  const eliminarArtesano = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/artesano/${_id}`)

    return data
  }

  /* Productos */

  const getProductos = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPublic.get(`/producto?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getProductosByCategoriaId = async ({ page = 1, limit = 6, query = {}, _id }) => {
    const { data } = await axiosPublic.get(`/producto?categoria=${_id}&page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getProductoById = async ({ _id }) => {
    const { data } = await axiosPrivate.get(`/producto/${_id}`)

    return data
  }

  /* DIRECCIÓN */

  const getDirecciones = async () => {
    const { data } = await axiosPublic.get('/direccion')

    return data
  }

  /* FETCH ON LOAD */

  useQuery(['categorias'], () => getCategorias({ query: { pagination: false } }), {
    retry: 3
  })

  useQuery(['direcciones'], getDirecciones, {
    retry: 3
  })

  return (
    <ApiContext.Provider value={{

      // Categorías
      getCategorias,
      getCategoriaById,

      // Artesanos
      getArtesanos,
      getArtesanoById,
      crearArtesano,
      actualizarArtesano,
      eliminarArtesano,

      // Productos
      getProductos,
      getProductoById,
      getProductosByCategoriaId,

      // Direccion
      getDirecciones
    }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export default APIProvider

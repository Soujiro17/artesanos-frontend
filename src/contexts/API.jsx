
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

  const crearCategoria = async ({ values }) => {
    const { data } = await axiosPrivate.post('/categoria', values)

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
    const { data } = await axiosPublic.get('/red-social')

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

  /* Rubros */

  const getRubros = async () => {
    const { data } = await axiosPublic.get('/rubro')

    return data
  }

  const crearRubro = async ({ values }) => {
    const { data } = await axiosPrivate.post('/rubro', values)

    return data
  }

  const actualizarRubro = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/rubro/${_id}`, values)

    return data
  }

  const eliminarRubro = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/rubro/${_id}`)

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

  /* Pymes */

  const getPymes = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPublic.get(`/pyme/all?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getArtesanoPymes = async ({ _id }) => {
    const { data } = await axiosPrivate.get(`/pyme/artesano/${_id}`)

    return data
  }

  const getCoordenadasPymes = async () => {
    const { data } = await axiosPublic.get('/pyme/all/coordenadas')

    return data
  }

  const crearPyme = async ({ values }) => {
    const { data } = await axiosPrivate.post('/pyme', values)

    return data
  }

  const actualizarPyme = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/pyme/${_id}`, values)

    return data
  }

  const eliminarPyme = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/pyme/${_id}`)

    return data
  }

  /* Productos */

  const getProductos = async ({ page = 1, limit = 10, query = {} }) => {
    const { data } = await axiosPublic.get(`/producto/all?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getProductosByCategoriaId = async ({ page = 1, limit = 6, query = {}, _id }) => {
    const { data } = await axiosPublic.get(`/producto/categoria/${_id}?page=${page}&limit=${limit}${toQuery(query)}`)

    return data
  }

  const getProductosByPymeId = async ({ _id, page = 1, limit = 6, paginate = true }) => {
    const { data } = await axiosPublic.get(`/producto/pyme/${_id}?page=${page}&limit=${limit}&paginate=${paginate}`)

    return data
  }

  const crearProducto = async ({ values }) => {
    const { data } = await axiosPrivate.post('/producto', values)

    return data
  }

  const actualizarProducto = async ({ values, _id }) => {
    const { data } = await axiosPrivate.put(`/producto/${_id}`, values)

    return data
  }

  const eliminarProducto = async ({ _id }) => {
    const { data } = await axiosPrivate.delete(`/producto/${_id}`)

    return data
  }

  const getProductoById = async ({ _id }) => {
    const { data } = await axiosPrivate.get(`/producto/${_id}`)

    return data
  }

  /* FETCH ON LOAD */

  useQuery('rubros', () => getRubros(), {
    retry: 3
  })

  useQuery('categorias', () => getCategorias({ query: { pagination: false } }), {
    retry: 3
  })
  useQuery('redes_sociales', () => getRedesSociales(), {
    retry: 3
  })

  return (
    <ApiContext.Provider value={{

      // Categorías
      getCategorias,
      getCategoriaById,
      crearCategoria,
      actualizarCategoria,
      eliminarCategoria,

      // Redes sociales
      getRedesSociales,
      crearRedSocial,
      actualizarRedSocial,
      eliminarRedSocial,

      // Rubros
      getRubros,
      crearRubro,
      actualizarRubro,
      eliminarRubro,

      // Artesanos
      getArtesanos,
      getArtesanoById,
      crearArtesano,
      actualizarArtesano,
      eliminarArtesano,

      // Pymes
      getPymes,
      getArtesanoPymes,
      getCoordenadasPymes,
      crearPyme,
      actualizarPyme,
      eliminarPyme,

      // Productos
      getProductos,
      getProductoById,
      getProductosByCategoriaId,
      getProductosByPymeId,
      crearProducto,
      actualizarProducto,
      eliminarProducto
    }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export default APIProvider

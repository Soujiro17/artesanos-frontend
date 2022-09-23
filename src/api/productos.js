import { axiosPublic } from '../services/axios'
import { toQuery } from '../utils/toQuery'

export const getProductos = async ({ page = 1, limit = 6, query = {} }) => {
  const { data } = await axiosPublic.get(`/producto?page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

export const getProductosByCategoriaId = async ({ page = 1, limit = 6, query = {}, _id }) => {
  const { data } = await axiosPublic.get(`/producto?categoria=${_id}&page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

export const getProductoById = async ({ _id }) => {
  const { data } = await axiosPublic.get(`/producto/${_id}`)

  return data
}

export const crearProducto = async ({ values, axios }) => {
  const { data } = await axios.post('/producto', values)

  return data
}

export const actualizarProducto = async ({ values, _id, axios }) => {
  const { data } = await axios.put(`/producto/${_id}`, values)

  return data
}

export const eliminarProducto = async ({ _id, axios }) => {
  const { data } = await axios.delete(`/producto/${_id}`)

  return data
}

export const getProductosByEmprendimientoId = async ({ _id, page = 1, limit = 6, pagination = true }) => {
  const { data } = await axiosPublic.get(`/producto?emprendimiento=${_id}&page=${page}&limit=${limit}&pagination=${pagination}`)

  return data
}

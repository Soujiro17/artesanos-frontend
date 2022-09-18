import { axiosPublic } from '../services/axios'
import { toQuery } from '../utils/toQuery'

export const getCategorias = async ({ page = 1, limit = 10, query = {} }) => {
  const { data } = await axiosPublic.get(`/categoria?page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

export const getCategoriaById = async (_id) => {
  const { data } = await axiosPublic.get(`/categoria/${_id}`)

  return data
}

export const crearCategoria = async ({ values, axios }) => {
  const { data } = await axios.post('/categoria', values)

  return data
}

export const actualizarCategoria = async ({ values, _id, axios }) => {
  const { data } = await axios.put(`/categoria/${_id}`, values)

  return data
}

export const eliminarCategoria = async ({ _id, axios }) => {
  const { data } = await axios.delete(`/categoria/${_id}`)

  return data
}

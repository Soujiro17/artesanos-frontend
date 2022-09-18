import { axiosPublic } from '../services/axios'
import { toQuery } from '../utils/toQuery'

export const getArtesanos = async ({ page = 1, limit = 10, query = {} }) => {
  const { data } = await axiosPublic.get(`/artesano?page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

export const getArtesanoById = async ({ _id }) => {
  const { data } = await axiosPublic.get(`/artesano/${_id}`)

  return data
}

export const crearArtesano = async ({ values, axios }) => {
  const { data } = await axios.post('/artesano', values)

  return data
}

export const actualizarArtesano = async ({ values, _id, axios }) => {
  const { data } = await axios.put(`/artesano/${_id}`, values)

  return data
}

export const eliminarArtesano = async ({ _id, axios }) => {
  const { data } = await axios.delete(`/artesano/${_id}`)

  return data
}

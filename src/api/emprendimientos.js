import { axiosPublic } from '../services/axios'
import { toQuery } from '../utils/toQuery'

export const getEmprendimientos = async ({ page = 1, limit = 6, query = {} }) => {
  const { data } = await axiosPublic.get(`/emprendimiento?page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

export const getEmprendimientoById = async ({ _id }) => {
  const { data } = await axiosPublic.get(`/emprendimiento/${_id}`)

  return data
}

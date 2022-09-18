import { axiosPublic } from '../services/axios'
import { toQuery } from '../utilities/toQuery'

export const getArtesanos = async ({ page = 1, limit = 10, query = {} }) => {
  const { data } = await axiosPublic.get(`/artesano?page=${page}&limit=${limit}${toQuery(query)}`)

  return data
}

import { axiosPublic } from '../services/axios'

export const getDirecciones = async () => {
  const { data } = await axiosPublic.get('/direccion')

  return data
}

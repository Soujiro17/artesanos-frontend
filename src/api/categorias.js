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

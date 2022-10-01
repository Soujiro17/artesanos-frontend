import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProductosByEmprendimientoId } from '../../api/productos'
import { Listar } from '../../components'

const Productos = () => {
  const { id } = useParams()

  if (!id) return <Navigate to='/' />

  return (
    <Listar
      title='Productos'
      pathToRedirectOnClick='producto'
      fetchFunction={getProductosByEmprendimientoId}
      notFoundImgPathName='/img/producto_no_encontrado.jpg'
      idToFetch={id}
    />
  )
}

export default Productos

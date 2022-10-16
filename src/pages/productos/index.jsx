import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProductosByEmprendimientoId } from '../../api/productos'
import { Listar } from '../../components'
import { imgs } from '../../data/images'

const Productos = () => {
  const { id } = useParams()

  if (!id) return <Navigate to='/' />

  return (
    <Listar
      title='Productos'
      pathToRedirectOnClick='producto'
      fetchFunction={getProductosByEmprendimientoId}
      notFoundImgPathName={imgs.producto_no_encontrado}
      idToFetch={id}
    />
  )
}

export default Productos

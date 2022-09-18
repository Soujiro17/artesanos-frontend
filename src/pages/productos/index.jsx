import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProductosByEmprendimientoId } from '../../api/productos'
import { Listar } from '../../components'

const Productos = () => {
  const { id } = useParams()

  if (!id) return <Navigate to='/' />

  return (
    <Listar fetchFunction={getProductosByEmprendimientoId} title='Productos' path='/producto/' _id={id} />
  )
}

export default Productos

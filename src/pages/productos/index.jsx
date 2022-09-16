import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Productos = () => {
  const { id } = useParams()

  const { getProductosByEmprendimientoId } = useApi()

  if (!id) return <Navigate to='/' />

  return (
    <Listar fetchFunction={getProductosByEmprendimientoId} title='Productos' path='/producto/' _id={id} />
  )
}

export default Productos

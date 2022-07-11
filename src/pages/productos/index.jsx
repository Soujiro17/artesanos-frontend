import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Productos = () => {
  const { id } = useParams()

  const { getProductosByPymeId } = useApi()

  console.log(id)

  if (!id) return <Navigate to='/' />

  return (
    <Listar fetchFunction={getProductosByPymeId} title='Productos' path='producto' _id={id} />
  )
}

export default Productos

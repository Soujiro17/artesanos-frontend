import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProductosByCategoriaId } from '../../api/productos'
import { Listar } from '../../components'

const Categoria = () => {
  const params = useParams()

  const [searchParams] = useSearchParams()
  const title = searchParams.get('name')

  return (
    <Listar
      title={title}
      path='/producto/'
      fetchFunction={getProductosByCategoriaId}
      _id={params.id}
      name
    />
  )
}

export default Categoria

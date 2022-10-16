import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getCategoriaById } from '../../api/categorias'
import { getProductosByCategoriaId } from '../../api/productos'
import { Listar } from '../../components'
import { imgs } from '../../data/images'

const Categoria = () => {
  const params = useParams()

  const { data: categoria } = useQuery(['categoria', params.id], () => getCategoriaById({ _id: params.id }))

  return (
    <Listar
      title={categoria?.nombre}
      pathToRedirectOnClick='producto'
      fetchFunction={getProductosByCategoriaId}
      notFoundImgPathName={imgs.categoria_no_encontrada}
      idToFetch={params.id}
    />
  )
}

export default Categoria

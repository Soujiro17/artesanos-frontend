import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Categoria = () => {

    const { id } = useParams()

    // const { getCategoriaById } = useApi()

    const [searchParams] = useSearchParams()
    const title = searchParams.get("name")

  return (
    <Listar 
      endpoint={`producto/categoria/${id}`} 
      title = {title} 
      path = "/producto/"
      fetchFunction={() => {}}
    />
  )
}

export default Categoria
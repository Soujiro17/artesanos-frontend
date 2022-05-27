import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Listar } from '../../components'

const Categoria = () => {

    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const title = searchParams.get("name")

  return <Listar endpoint={`producto/categoria/${id}`} title = {title} path = "/producto/" />
}

export default Categoria
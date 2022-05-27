import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Listar } from '../../components'

const Productos = () => {

    const [searchParams] = useSearchParams()

    const title = searchParams.get("id")

  return (
    <Listar endpoint="producto/all" title={title || 'Productos'} path = "producto" />
  )
}

export default Productos
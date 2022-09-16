import React from 'react'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Categorias = () => {
  const { getCategorias } = useApi()

  return (
    <Listar
      title='Categorías'
      fetchFunction={getCategorias}
      path='/categoria/'
    />
  )
}
export default Categorias

import React from 'react'
import { getCategorias } from '../../api/categorias'
import { Listar } from '../../components'

const Categorias = () => {
  return (
    <Listar
      title='Categorías'
      fetchFunction={getCategorias}
      path='/categoria/'
    />
  )
}
export default Categorias

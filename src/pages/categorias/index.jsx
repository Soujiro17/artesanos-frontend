import React from 'react'
import { getCategorias } from '../../api/categorias'
import { Listar } from '../../components'
import { imgs } from '../../data/images'

const Categorias = () => {
  return (
    <Listar
      title='Categorías'
      fetchFunction={getCategorias}
      pathToRedirectOnClick='categoria'
      notFoundImgPathName={imgs.categoria_no_encontrada}
    />
  )
}
export default Categorias

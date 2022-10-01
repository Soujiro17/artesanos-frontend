import React from 'react'
import { getCategorias } from '../../api/categorias'
import { Listar } from '../../components'

const Categorias = () => {
  return (
    <Listar
      title='Categorías'
      fetchFunction={getCategorias}
      pathToRedirectOnClick='categoria'
      notFoundImgPathName='/img/categoria_no_encontrada.png'
    />
  )
}
export default Categorias

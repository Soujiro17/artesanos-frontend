import React from 'react'
import { getEmprendimientos } from '../../api/emprendimientos'
import { Listar } from '../../components'

const Artesanos = () => {
  return (
    <Listar
      title='Artesanos'
      pathToRedirectOnClick='artesano'
      fetchFunction={getEmprendimientos}
      customAttributeToRedirect='artesano'
      notFoundImgPathName='/img/artesano_no_encontrado.png'
    />
  )
}

export default Artesanos

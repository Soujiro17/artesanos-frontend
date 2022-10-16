import React from 'react'
import { getEmprendimientos } from '../../api/emprendimientos'
import { Listar } from '../../components'
import { imgs } from '../../data/images'

const Artesanos = () => {
  return (
    <Listar
      title='Artesanos'
      pathToRedirectOnClick='artesano'
      fetchFunction={getEmprendimientos}
      customAttributeToRedirect='artesano'
      notFoundImgPathName={imgs.artesano_no_encontrado}
    />
  )
}

export default Artesanos

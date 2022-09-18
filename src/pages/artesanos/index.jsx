import React from 'react'
import { getArtesanos } from '../../api/artesanos'
import { Listar } from '../../components'

const Artesanos = () => {
  return (
    <Listar title='Artesanos' fetchFunction={getArtesanos} path='/artesano/' artesano />
  )
}

export default Artesanos

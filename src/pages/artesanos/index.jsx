import React from 'react'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Artesanos = () => {
  const { getArtesanos } = useApi()

  return (
    <Listar title='Artesanos' fetchFunction={getArtesanos} path='/artesano/' />
  )
}

export default Artesanos

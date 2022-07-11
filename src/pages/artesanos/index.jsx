import React from 'react'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'

const Artesanos = () => {
  const { getPymes } = useApi()

  return (
    <Listar title='Artesanos' fetchFunction={getPymes} path='/artesano/' artesano />
  )
}

export default Artesanos

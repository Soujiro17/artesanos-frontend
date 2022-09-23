import React from 'react'
import { getEmprendimientos } from '../../api/emprendimientos'
import { Listar } from '../../components'

const Artesanos = () => {
  return (
    <Listar title='Artesanos' fetchFunction={getEmprendimientos} />
  )
}

export default Artesanos

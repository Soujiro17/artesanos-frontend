import React from 'react'
import { Listar } from '../../components'
import useApi from '../../hooks/useApi'
import styles from './styles.module.scss'

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

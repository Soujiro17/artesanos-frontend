import React from 'react'
import { Listar, ListarHeader } from '../../components'
import styles from './styles.module.scss'

const Categorias = () => {
  return (
      <Listar filtros={FiltrosCategorias} title = "Categorías"/>
  )
}

const FiltrosCategorias = () => {
  return(
    <div className={styles.filtros}>
      Filtros
    </div>
  )
}

export default Categorias
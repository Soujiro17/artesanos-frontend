import React from 'react'
import { Listar, ListarHeader } from '../../components'
import useApi from '../../hooks/useApi'
import styles from './styles.module.scss'

const Categorias = () => {

  const { getCategorias } = useApi()

  return (
      <Listar 
        filtros={FiltrosCategorias} 
        title = "Categorías" 
        fetchFunction={getCategorias} 
        endpoint="categoria"
      />
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
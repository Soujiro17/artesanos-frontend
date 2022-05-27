import React from 'react'
import { Listar, ListarHeader } from '../../components'
import useAuth from '../../hooks/useAuth'
import styles from './styles.module.scss'

const Categorias = () => {

  const { categorias } = useAuth()

  /* 
    En vez de reemplazar la cantidad de categorías, crear un hook
    donde se guarden los resultados del filtro, cosa de no perder
    todas las categorías. Ej: si voy a la página 2 y los guardo en
    el context de categorías, si vuelvo a la página 1 tendría los
    resultados de la página 2.
  */

  return (
      <Listar filtros={FiltrosCategorias} title = "Categorías" data = {categorias.categorias} total = {categorias.total} path = "?id="/>
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
import React from 'react'
import { Link } from 'react-router-dom'
import ListarHeader from '../listarHeader'
import styles from './styles.module.scss'
import { productos } from '../../data/productos'

const Listar = ({ filtros: Filtros, title }) => {

  /* 
    Agregar media query para mostrar los nombres de los artesanos
    en mobile 
  */

  return (
    <>
      {
        title && <ListarHeader title={title} />
      }
      <div className={styles.listar}>
        {
          Filtros && (
          <div className={styles.filtros}>
            <Filtros />
          </div>
          )
        }
        <div className={styles.items}>
          {productos.map(item => 
            <Link to={item.url} className = {styles.item_link}>
              <img src={item.imageUrl} className = {styles.item_img} alt = "" />
              <div className={styles.item_name}>{item.name}</div>
            </Link>)}
        </div>
        <div className={styles.paginas}>
          <div className={styles.pagina}>1</div>
          <div className={styles.pagina}>2</div>
          <div className={styles.pagina}>3</div>
          <div className={styles.pagina}>4</div>
        </div>
      </div>
    </>
  )
}

export default Listar
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const Presentacion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.presentacion}>
        <div className={styles.presentacion_left}>
          <div className={styles.presentacion_header_wrapper}>
            <h1 className={styles.presentacion_title}>Bienvenidos</h1>
            <h1 className={`${styles.presentacion_title} text-align-right`}><span className='bb-gc'>a</span> Conect <span className='bb-gc'>Arte</span></h1>
            <div className={styles.presentacion_subtitle_wrapper}>
              <p className={styles.presentacion_subtitle}>Página de la municipalidad de San Miguel en <br /> ayuda de los emprendedores locales</p>
              <Link to='/artesanos' className={`btn accent ${styles.link_to_artesanos}`}>Comienza aquí</Link>
            </div>
          </div>
        </div>
      </div>
      <img className={styles.presentacion_img} alt='presentacion imagen' src='#' style={{ backgroundColor: 'gray' }} />
    </div>
  )
}

export default Presentacion

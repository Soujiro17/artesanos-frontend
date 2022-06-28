import React from 'react'
import OrangeLine from '../orangeLine'
import styles from './styles.module.scss'

const Presentacion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.presentacion}>
        <div className={styles.presentacion_left}>
          <div className={styles.presentacion_header_wrapper}>
            <h1 className={styles.presentacion_title}>Bienvenidos</h1>
            <h1 className={`${styles.presentacion_title} text-align-right`}><span>a</span> Conect <span>Arte</span></h1>
            <div className={styles.presentacion_subtitle_wrapper}>
              <p className={styles.presentacion_subtitle}>Página de la municipalidad de San Miguel en <br /> ayuda de los emprendedores locales</p>
            </div>
          </div>
          <OrangeLine className={styles.orange_line} />
        </div>
        <div className={styles.presentacion_right} />
      </div>
    </div>
  )
}

export default Presentacion

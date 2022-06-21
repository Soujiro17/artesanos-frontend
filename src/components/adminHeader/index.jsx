import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <p className={styles.header_title}>Pestañas de administración</p>
      <nav>
        <ul className={styles.nav_list}>
          <li className={styles.nav_list_item}>
            <Link to='categorias'>Categorias</Link>
          </li>
          <li className={styles.nav_list_item}>
            <Link to='pymes'>Pymes</Link>
          </li>
          <li className={styles.nav_list_item}><Link to='redes-sociales'>Redes sociales</Link></li>
          <li className={styles.nav_list_item}><Link to='rubros'>Rubros</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader

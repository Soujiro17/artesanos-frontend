import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <h2 className={`${styles.title} color-p`}>Pestañas de Administración</h2>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_list_item}><Link to=''>Inicio</Link></li>
          <li className={styles.nav_list_item}>
            <Link to='categorias'>Categorias</Link>
          </li>
          <li className={styles.nav_list_item}><Link to='artesanos'>Artesanos</Link></li>
          <li className={styles.nav_list_item}><Link to='productos'>Productos</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader

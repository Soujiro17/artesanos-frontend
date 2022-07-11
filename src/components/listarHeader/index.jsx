import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const ListarHeader = ({ title }) => {
  return (
    <div className={styles.listar_header}>
      <Link to={-1}>
        <img src='/img/right_arrow.svg' className={styles.arrow} />
      </Link>
      <p className={styles.listar_title}>{title}</p>
    </div>
  )
}

export default ListarHeader

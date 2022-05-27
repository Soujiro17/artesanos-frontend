import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const ListarHeader = ({ title }) => {
  return (
    <div className={styles.listar_header}>
        <Link to="/">
            <img src='/img/right_arrow.svg' className={styles.arrow} />
        </Link>
        {title}
    </div>
  )
}

export default ListarHeader
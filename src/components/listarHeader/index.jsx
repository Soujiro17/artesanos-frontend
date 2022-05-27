import React from 'react'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const ListarHeader = ({ title }) => {

  const navigate = useNavigate()

  return (
    <div className={styles.listar_header}>
        <Link to = {-1} >
            <img src='/img/right_arrow.svg' className={styles.arrow} />
        </Link>
        {title}
    </div>
  )
}

export default ListarHeader
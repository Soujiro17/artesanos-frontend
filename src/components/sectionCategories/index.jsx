/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import Section from '../section'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { useQuery } from 'react-query'
import Spinner from '../spinner'

const SectionCategories = () => {
  const { getCategorias } = useApi()

  const { data, isLoading, isError } = useQuery('categorias', () => getCategorias())

  return (
    <Section name='CATEGORÍAS'>
      <div className={styles.header}>
        <p>Categorías (de la A-Z)</p>
      </div>
      <div className={styles.content}>
        {
          isLoading
            ? <Spinner />
            : isError
              ? <p className='error'>Error al cargar las categorías</p>
              : <>
                {data?.docs?.length > 0
                  ? (
                      data?.docs?.map((categoria) => (
                        <Link
                          to={`/categorias?id=${categoria.nombre.toLowerCase()}`}
                          className={styles.categoria_wrapper}
                          key={categoria._id}
                        >
                          <img
                            src={categoria.picture || '/img/not_found_default.jpg'}
                            alt=''
                            className={styles.categoria_img}
                          />
                          <div className={styles.categoria_nombre}>{categoria.nombre}</div>
                        </Link>
                      ))
                    )
                  : <p className='error'>No hay categorías para mostrar</p>}
              </>
        }
      </div>
      <footer className={styles.footer}>
        <p className={styles.search}>Buscar</p>
        <div className={styles.search_group}>
          <input placeholder='Categoría' className='input' />
          <button className={styles.margin + ' btn'}>Buscar</button>
        </div>
      </footer>
    </Section>
  )
}

export default SectionCategories

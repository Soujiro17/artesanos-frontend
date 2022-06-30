/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import Section from '../section'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { useQuery } from 'react-query'
import Spinner from '../spinner'
import OrangeLine from '../orangeLine'
import StackCircles from '../stackCircles'

const SectionCategories = () => {
  const { getCategorias } = useApi()

  const { data, isLoading, isError } = useQuery('categorias', () => getCategorias({ query: { pagination: false } }))

  return (
    <>
      <StackCircles left />
      <Section name='CATEGORÍAS'>
        <div className={styles.header}>
          <p>A-Z</p>
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
                              to={`/categoria/${categoria._id}?name=${categoria.nombre.toLowerCase()}`}
                              className={styles.categoria_wrapper}
                              key={categoria._id}
                            >
                              <img
                                src={categoria.picture_url || '/img/not_found_default.jpg'}
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
        <OrangeLine style={{ marginTop: '5rem', marginBottom: '5rem' }} />
        <footer className={styles.footer}>
          <div className={styles.footer_cont}>
            <p className={styles.search}>Buscar</p>
            <div className={styles.search_group}>
              <input placeholder='Categoría' className={`${styles.search_input} input`} />
              <button className={`${styles.btn_buscar} btn btn-effect`}>Buscar</button>
            </div>
          </div>
        </footer>
      </Section>
    </>
  )
}

export default SectionCategories

import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import Layout from '../layout'
import ListarHeader from '../listarHeader'
import Spinner from '../spinner'
import StackCircles from '../stackCircles'
import styles from './styles.module.scss'

/*
    Agregar media query para mostrar los nombres de los artesanos
    en mobile
*/

const initialDataState = {
  docs: [],
  totalDocs: 0,
  totalPages: 0,
  hasPrevPage: null,
  hasNextPage: null,
  prevPage: 0,
  page: 0,
  nextPage: 0
}

const Listar = ({ filtros: Filtros, title, path = '', fetchFunction, name = false, _id }) => {
  const [page, setPage] = useState(1)

  const [searchParams] = useSearchParams()
  const subTitle = searchParams.get('id')

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery([title?.toLowerCase(), page], () => fetchFunction({ page, _id }), {
    initialDataState
  })

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery([title?.toLowerCase(), page, _id], () =>
        fetchFunction({ page, _id })
      )
    }
  }, [data, page, queryClient])

  return (
    <Layout>
      {title && <ListarHeader title={subTitle || title} />}
      <StackCircles left />
      <div className={styles.listar}>
        {Filtros && (
          <div className={styles.filtros}>
            <Filtros />
          </div>
        )}
        <div className={styles.items}>
          {isLoading
            ? <Spinner />
            : (data?.docs?.length > 0
                ? (
                    data?.docs.map((doc, i) => (
                      <Link
                        to={name ? `${path}${doc._id}?name=${doc.nombre}` : (path + (doc.url?.toLowerCase() || doc?._id))}
                        className={styles.item_link}
                        key={doc._id || i}
                      >
                        <img
                          src={doc.foto?.url || '/img/not_found_default.jpg'}
                          className={styles.item_img}
                          alt=''
                        />
                        <div className={styles.item_name}>{doc.nombre || `${doc.nombres} ${doc.apellidos}`}</div>
                      </Link>
                    ))
                  )
                : (
                  <p className='error'>No hay elementos para mostrar</p>
                  ))}
        </div>
        <div className={styles.paginas}>
          {
            [...Array(data?.totalPages)].map((item, i) => {
              return (
                <div
                  className={`${styles.pagina} ${page === i + 1 ? styles.current : null}`}
                  onClick={() => setPage(i + 1)}
                  key={i}
                >
                  {i + 1}
                </div>
              )
            }
            )
        }
          <StackCircles right />
        </div>
      </div>
    </Layout>
  )
}

export default Listar

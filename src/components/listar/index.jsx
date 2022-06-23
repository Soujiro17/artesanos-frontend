import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import ListarHeader from '../listarHeader'
import Spinner from '../spinner'
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

const Listar = ({ filtros: Filtros, title, path = '', fetchFunction }) => {
  const [page, setPage] = useState(1)

  const [searchParams] = useSearchParams()
  const subTitle = searchParams.get('id')

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery([title?.toLowerCase(), page], () => fetchFunction({ page }), {
    initialDataState
  })

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery([title?.toLowerCase(), page], () =>
        fetchFunction({ page })
      )
    }
  }, [data, page, queryClient])

  return (
    <>
      {title && <ListarHeader title={subTitle || title} />}
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
                        to={`${path}${doc.url?.toLowerCase() || `${doc._id}?name=${doc.nombre}`}`}
                        className={styles.item_link}
                        key={doc._id || i}
                      >
                        <img
                          src={doc.picture_url || '/img/not_found_default.jpg'}
                          className={styles.item_img}
                          alt=''
                        />
                        <div className={styles.item_name}>{doc.nombre}</div>
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
        </div>
      </div>
    </>
  )
}

export default Listar

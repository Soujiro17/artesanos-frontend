import React, { useEffect, useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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

const ListarItem = ({ item, pathToRedirectOnClick, customAttributeToRedirect, notFoundImgPathName }) => {
  const urlToRedirect = ('/' + pathToRedirectOnClick + '/' + (customAttributeToRedirect ? item[customAttributeToRedirect] : item?._id)) || '#'

  return (
    <Link to={urlToRedirect} className={styles.item_link} key={item._id}>
      <img src={item.foto?.url || notFoundImgPathName} className={styles.item_img} alt='' />
      <div className={styles.item_name}>{item?.nombre || item?.emprendimiento?.nombre}</div>
    </Link>
  )
}

const ListarPaginas = ({ data, page, setPage }) => {
  return (
    [...Array(data?.totalPages)].map((item, i) => {
      return (
        <div className={`${styles.pagina} ${page === i + 1 ? styles.current : null}`} onClick={() => setPage(i + 1)} key={i}>
          {i + 1}
        </div>
      )
    }
    )
  )
}

const Listar = ({ title, pathToRedirectOnClick = '', customAttributeToRedirect = '', fetchFunction, notFoundImgPathName, idToFetch }) => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery([title?.toLowerCase(), page], () => fetchFunction({ page, _id: idToFetch }), { initialDataState })

  const queryClient = useQueryClient()

  const items = useMemo(() => {
    if (!data) return null

    return data?.docs?.map(item =>
      <ListarItem
        key={item._id}
        item={item}
        pathToRedirectOnClick={pathToRedirectOnClick}
        customAttributeToRedirect={customAttributeToRedirect}
        notFoundImgPathName={notFoundImgPathName}
      />
    )
  }, [data])

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery([title?.toLowerCase(), page, idToFetch], () =>
        fetchFunction({ page, _id: idToFetch })
      )
    }
  }, [data, page, queryClient])

  return (
    <Layout>
      {title && <ListarHeader title={title} />}
      <StackCircles left />
      <div className={styles.listar}>
        <div className={styles.items}>
          {isLoading ? <Spinner /> : items?.length > 0 ? items : <p className='error'>No hay elementos para mostrar</p>}
        </div>
        <div className={styles.paginas}>
          <ListarPaginas data={data} page={page} setPage={setPage} />
          <StackCircles right />
        </div>
      </div>
    </Layout>
  )
}

export default Listar

import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Layout, OrangeLine, Section, Spinner } from '../../components'
import styles from './styles.module.scss'
import useApi from '../../hooks/useApi'
import { useQuery } from 'react-query'

const Producto = () => {
  const { id } = useParams()

  const { getProductoById } = useApi()

  if (!id) return <Navigate to='/' />

  const { data: producto, isLoading } = useQuery(['producto', id], () => getProductoById({ _id: id }))

  return (
    <Layout>
      {isLoading && <Spinner fullScreen />}
      <Section>
        <div className={styles.producto}>
          <p className={`color-p ${styles.producto_title}`}>{producto?.nombre}</p>
          <div className={styles.producto_detalles}>
            <div className={styles.producto_imagen}>
              <img alt={producto?.nombre} src={producto?.picture_url || '/img/not_found_default.jpg'} className={styles.img_producto} />
            </div>
            <div className={styles.producto_info}>
              <h2>Descripción del producto</h2>
              <p className={styles.precio_sku_stock}>Precio ${producto?.precio?.toLocaleString()} | <span>SKU {producto?.sku}</span> | <span>Disponibles {producto?.stock}</span></p>
              <p>{producto?.descripcion}</p>
              <OrangeLine />
              <h2>Emprendedor al que pertenece</h2>
              <Link to={`/artesano/${producto?.pymeId.duenoId}`}>
                <img alt={producto?.pymeId?.nombre} src={producto?.pymeId?.picture_url} className={styles.img_pyme} />
                <p className={styles.pyme_nombre}>{producto?.pymeId?.nombre}</p>
              </Link>
              <Link to={`/productos/${producto?.pymeId._id}`}>
                <button className='btn btn-effect bg-cyan'>Más productos</button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default Producto

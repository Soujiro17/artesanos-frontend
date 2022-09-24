import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Layout, OrangeLine, Section, Spinner } from '../../components'
import styles from './styles.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getProductoById } from '../../api/productos'

const Producto = () => {
  const { id } = useParams()

  // eslint-disable-next-line eqeqeq
  if (!id || id == 'undefined') return <Navigate to={-1} />

  const { data: producto, isLoading } = useQuery(['producto', id], () => getProductoById({ _id: id }))

  return (
    <Layout>
      {(isLoading) && <Spinner fullScreen />}
      <Section>
        <div className={styles.producto}>
          <p className={`color-p ${styles.producto_title}`}>{producto?.nombre}</p>
          <div className={styles.producto_detalles}>
            <div className={styles.producto_imagen}>
              <img alt={producto?.nombre} src={producto?.foto?.url || '/img/not_found_default.jpg'} className={styles.img_producto} />
            </div>
            <div className={styles.producto_info}>
              <h2>Descripción del producto</h2>
              <p className={styles.precio_sku_stock}>Precio: {producto?.precio ? `$${producto?.precio?.toLocaleString()}` : 'Consultar con el artesano'} | <span>Disponibilidad: {producto?.stock ? producto?.stock.toLocaleString() : 'Consultar con artesano'}</span></p>
              <p>{producto?.descripcion}</p>
              <OrangeLine />
              <h2>Emprendedor al que pertenece</h2>
              <Link to={`/artesano/${producto?.emprendimiento?.artesano?._id}`}>
                <img alt={producto?.pymeId?.nombre} src={producto?.emprendimiento?.artesano?.foto?.url || '/img/not_found_default.jpg'} className={styles.img_pyme} />
                <p className={styles.pyme_nombre}>{producto?.emprendimiento?.nombre}</p>
              </Link>
              <Link to={`/productos/${producto?.emprendimiento?._id}`}>
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

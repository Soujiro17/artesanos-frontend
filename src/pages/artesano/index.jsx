import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { Layout, Section, Spinner, StackCircles } from '../../components'
import useApi from '../../hooks/useApi'
import styles from './styles.module.scss'

const Artesano = () => {
  const params = useParams()

  const api = useApi()

  const { data: artesano, isLoading } = useQuery(['artesano', params.id], () => api.getArtesanoById({ _id: params.id }))
  const { data: pymes, isLoading: isLoadingPymes } = useQuery(['pymes', params.id], () => api.getArtesanoPymes({ _id: params.id }))

  console.log(artesano, pymes)

  return (
    <Layout>
      <>
        <StackCircles left />
        <Section>
          {(isLoading || isLoadingPymes) && <Spinner />}
          <div className={styles.artesano}>
            <div className={styles.artesano_nombres}>
              <p className={`${styles.artesano_nombre} color-p`}>{artesano?.nombres} <span className={`${styles.artesano_apellido} bb-gc`}>{artesano?.apellidos}</span></p>
            </div>
            <div className={styles.artesano_datos}>
              <div className={styles.artesanos_fotos}>
                <div className={styles.artesano_pymes}>
                  {
                    pymes?.slice(0, 2).map(pyme => (
                      <Link to='#' key={pyme._id}>
                        <div className={styles.producto_foto_group}>
                          <img className={`${styles.foto}`} src={pyme.picture_url} />
                          <p className={styles.producto_nombre}>{pyme.nombre}</p>
                        </div>
                      </Link>
                    ))
                  }
                </div>
                <div className={styles.artesano_foto}>
                  <img src={artesano?.picture_url} className={`${styles.artesanofoto}`} />
                </div>
              </div>
              <div className={styles.artesano_productos}>
                <Link to='#'>
                  <div className={styles.producto_foto_group}>
                    <img src={artesano?.picture_url} className={`${styles.foto}`} />
                    <p className={styles.producto_nombre}>Text</p>
                  </div>
                </Link>
                <Link to='#'>
                  <div className={styles.producto_foto_group}>
                    <img src={artesano?.picture_url} className={`${styles.foto}`} />
                    <p className={styles.producto_nombre}>Text</p>
                  </div>
                </Link>
                <Link to='#'>
                  <div className={styles.producto_foto_group}>
                    <img src={artesano?.picture_url} className={`${styles.foto}`} />
                    <p className={styles.producto_nombre}>Text</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Section>
        <StackCircles right />
      </>
    </Layout>
  )
}

export default Artesano

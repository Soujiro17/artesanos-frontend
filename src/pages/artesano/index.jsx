/* eslint-disable react/jsx-indent */
import React, { useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { Layout, OrangeLine, Section, Spinner, StackCircles, Map } from '../../components'
import useApi from '../../hooks/useApi'
import styles from './styles.module.scss'

const FotoConAnchorYText = ({ nombre = 'Producto no disponible', img, url }) => {
  return (
    <Link to={url || '#'}>
      <div className={styles.producto_foto_group}>
        <img className={`${styles.foto}`} src={img || '/img/not_found_default.jpg'} />
        <p className={styles.producto_nombre}>{nombre}</p>
      </div>
    </Link>
  )
}

const ArtesanoMapa = ({ pymes }) => {
  const [showMap, setShowMap] = useState(false)
  const handleShowMap = () => setShowMap(!showMap)

  return (
    <div className={styles.mapa_artesano}>
      <button className='bg-cyan btn-effect btn' onClick={handleShowMap}>Ver mapa</button>
      {showMap && (
        <div className={styles.mapa}>
          <Map data={pymes} />
        </div>
      )}
    </div>
  )
}

const Artesano = () => {
  const params = useParams()

  const api = useApi()

  const { data: artesano, isLoading } = useQuery(['artesano', params.id], () => api.getArtesanoById({ _id: params.id }))
  const { data: pymes = [], isLoading: isLoadingPymes } = useQuery(['pymes', params.id], () => api.getArtesanoPymes({ _id: params.id }))
  const { data: productos, isLoadingProductos } = useQuery(['productos', pymes[0]?._id], () => api.getProductosByPymeId({ _id: pymes[0]?._id }), {
    enabled: !!pymes
  })

  const finalProducts = useMemo(() => {
    if (!productos) return null

    const final = []

    for (let i = 0; i < 5; i++) {
      if (i > productos?.docs?.length) {
        final.push(<FotoConAnchorYText key={i} />)
      } else {
        if (productos?.docs) {
          final.push(<FotoConAnchorYText key={i} img={productos?.docs[i]?.picture_url} nombre={productos?.docs[i]?.nombre} url={`/producto/${productos?.docs[i]?._id}`} />)
        }
      }
    }

    return final
  }, [productos])

  return (
    <Layout>
      <>
        <StackCircles left />
        <Section>
          {(isLoading || isLoadingPymes || isLoadingProductos)
            ? <Spinner />
            : <div className={styles.artesano}>
              <div className={styles.artesano_nombres}>
                <p className={`${styles.artesano_nombre} color-p`}>{artesano?.nombres} <span className={`${styles.artesano_apellido} bb-gc`}>{artesano?.apellidos}</span></p>
              </div>
              <div className={styles.artesano_datos}>
                <div className={styles.artesano_datos_cont}>
                  <div className={styles.artesanos_fotos}>
                    <div className={styles.artesano_pymes}>
                      {
                       finalProducts?.slice(0, 2)
                      }
                      {/* <p className={`${styles.text} color-p`}>Pymes</p> */}
                      {/* {pymes?.slice(0, 2).map(pyme => <FotoConAnchorYText value={pyme} key={pyme._id} />)} */}
                    </div>
                    <div className={styles.artesano_foto}>
                      {/* <p className={`${styles.text} color-p`}>Artesano</p> */}
                      <img src={artesano?.picture_url} className={`${styles.artesanofoto}`} />
                    </div>
                  </div>
                  <div className={styles.artesano_productos}>
                    {/* <p className={`${styles.text} color-p`}>Productos</p> */}
                    <div className={styles.artesano_productos_cont}>
                      {
                        finalProducts?.slice(2, 5)
                      }
                    </div>
                    <Link to={`/productos/${pymes[0]._id}`} className={styles.anchor_btn}>
                      <button className='bg-cyan btn-effect btn'>Más productos</button>
                    </Link>
                  </div>
                </div>
                <OrangeLine />
                <div className={styles.sobre_emprendimiento}>
                  <p className={styles.emprendimiento_title}>Sobre el emprendimiento</p>
                  <p className={styles.emprendimiento_text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <ArtesanoMapa pymes={pymes} />
              </div>
              </div>}
        </Section>
        <StackCircles right />
      </>
    </Layout>
  )
}

export default Artesano

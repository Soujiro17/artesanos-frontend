/* eslint-disable react/jsx-indent */
import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Layout, OrangeLine, Section, Spinner, StackCircles, Map } from '../../components'
import styles from './styles.module.scss'
import { getArtesanoById } from '../../api/artesanos'
import draftToHtml from 'draftjs-to-html'
import parser from 'html-react-parser'
import { imgs } from '../../data/images'

const FotoConAnchorYText = ({ nombre = 'Producto no disponible', img, url, izq = false }) => {
  return (
    <Link to={url || '#'} className={`${styles.anchor_img} ${izq ? styles.izq : ''}`}>
      <div className={styles.producto_foto_group}>
        <img className={`${styles.foto}`} src={img || imgs.producto_no_encontrado} />
        <p className={styles.producto_nombre}>{nombre}</p>
      </div>
    </Link>
  )
}

const ArtesanoMapa = ({ emprendimiento }) => {
  const [showMap, setShowMap] = useState(false)
  const handleShowMap = () => setShowMap(!showMap)

  return (
    <div className={styles.mapa_artesano}>
      <button className='bg-cyan btn-effect btn' onClick={handleShowMap}>Ver mapa</button>
      {showMap && (
        <div className={styles.mapa}>
          <Map data={emprendimiento} />
        </div>
      )}
    </div>
  )
}

const Artesano = () => {
  const params = useParams()

  const { data: artesano, isLoading } = useQuery(['artesano', params.id], () => getArtesanoById({ _id: params.id }))

  const emprendimiento = artesano?.emprendimiento
  const productos = artesano?.emprendimiento?.productos

  const navigate = useNavigate()

  const finalProducts = useMemo(() => {
    if (!productos) return null

    const final = []

    for (let i = 0; i < 5; i++) {
      if (i > productos.length - 1) {
        final.push(<FotoConAnchorYText key={i} izq={i === 0 || i === 1} />)
      } else {
        if (productos) {
          final.push(
            <FotoConAnchorYText
              key={i}
              img={productos[i]?.foto?.url}
              nombre={productos[i]?.nombre}
              url={`/producto/${productos[i]?._id}`}
              izq={i === 0 || i === 1}
            />
          )
        }
      }
    }

    return final
  }, [artesano])

  return (
    <Layout>
      <>
        <StackCircles left />
        <Section>
          {(isLoading)
            ? <Spinner />
            : <div className={styles.artesano}>
              <div className={styles.artesano_nombres}>
                <p className={`${styles.artesano_nombre} color-p`}>{artesano?.nombres}<span className={`${styles.artesano_apellido} bb-gc`}>{' '}{artesano?.apellidos}{' '}</span>{emprendimiento?.nombre ? `- ${emprendimiento?.nombre}` : ''}</p>
              </div>
              <div className={styles.artesano_datos}>
                <div className={styles.artesano_datos_cont}>
                  <div className={styles.artesano_fotos_izquierda}>
                    {
                      finalProducts?.slice(0, 2)
                    }
                  </div>
                  <img src={artesano?.foto?.url || imgs.artesano_no_encontrado} className={styles.artesano_foto} />
                  <div className={styles.artesano_productos_cont}>
                    {
                      finalProducts?.slice(2, 5)
                    }
                  </div>
                </div>
                <div className={styles.btn_div}>
                  <button className='bg-cyan btn-effect btn' onClick={() => navigate(`/productos/${emprendimiento?._id}`)}>Más productos</button>
                </div>
                <OrangeLine />
                <div className={styles.sobre_emprendimiento}>
                  <p className={styles.emprendimiento_title}>Sobre el emprendimiento</p>
                  <p className={styles.emprendimiento_text} />
                    {emprendimiento ? parser(draftToHtml(JSON.parse(emprendimiento.descripcion))) : null}
                </div>
                <ArtesanoMapa emprendimiento={emprendimiento} />
              </div>
              </div>}
        </Section>
        <StackCircles right />
      </>
    </Layout>
  )
}

export default Artesano

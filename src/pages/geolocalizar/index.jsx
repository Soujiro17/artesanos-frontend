import React from 'react'
import styles from './styles.module.scss'
import { Layout, Section, Map, StackCircles } from '../../components'

const Geolocalizar = () => {
  const style = { position: 'initial', opacity: 1 }

  return (
    <Layout>
      <Section>
        <div className={styles.geolocalizar}>
          <p className={`${styles.geolocalizar_title} color-p`}>Mapa <span className='bb-gc'>Georeferencial</span></p>
          <div className={styles.circulos}>
            <p className={`${styles.geolocalizar_subtitle} color-acc`}>Ubica a los emprendedores más cercanos a ti</p>
            <StackCircles rows='4' columns='3' style={style} />
          </div>
          <Map geolocation position />
          <StackCircles rows='4' columns='3' style={style} />
        </div>
      </Section>
    </Layout>
  )
}

export default Geolocalizar

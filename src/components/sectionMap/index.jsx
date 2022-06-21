import React, { useEffect } from 'react'
import { Section, Map } from '..'
import styles from './styles.module.scss'

const SectionMap = () => {

  return (
    <Section name="Mapa georeferencial" className={styles.map_section} id = "geolocalizar">
        <div className={styles.content}>
            <p className={styles.title}>¡Encuentra a los artesanos más cercanos a ti!</p>
            <Map geolocation />
        </div>
    </Section>
  )
}

export default SectionMap
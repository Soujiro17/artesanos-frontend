import React from 'react'
import { Section, Map, StackCircles } from '..'
import styles from './styles.module.scss'

const SectionMap = () => {
  return (
    <>
      <StackCircles right />
      <Section name='Mapa georeferencial' className={styles.map_section} id='geolocalizar'>
        <p className={styles.title}>¡Encuentra a los artesanos más cercanos a ti!</p>
        <Map geolocation points />
      </Section>
    </>
  )
}

export default SectionMap

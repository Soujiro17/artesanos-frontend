import React from 'react'
import { Layout, OrangeLine, Section, StackCircles } from '../../components'
import styles from './styles.module.scss'

const AcercaDe = () => {
  return (
    <Layout>
      <Section>
        <div className={styles.acerca_de}>
          <h2 className={`color-p ${styles.acerca_de_title}`}>Acerca de Nosotros</h2>
          <div className={styles.acerca_de_content}>
            <div className={styles.logo_wrapper}>
              <img src='/circulo_azul.png' alt='circle' className={`${styles.circle} ${styles.blue_circle}`} />
              <img src='/circulo_rayas.png' alt='circle' className={`${styles.circle} ${styles.gray_circle}`} />
              <img src='/san_miguel.jpg' alt='san miguel' className={styles.logo} />
            </div>
            <div className={styles.acerca_de_info}>
              <h2>Sobre el proyecto</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <OrangeLine />
              <h2>Objetivo</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <StackCircles rows={2} columns={16} className={styles.circles} />
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default AcercaDe

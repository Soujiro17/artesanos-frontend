import React from 'react'
import styles from './styles.module.scss'
import { SectionCategories, SectionMap, Presentacion, Layout, OrangeLine, Section } from '../../components'

const Home = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <Presentacion />
        <Section>
          <OrangeLine />
        </Section>
        <SectionCategories />
        <SectionMap />
      </main>
    </Layout>
  )
}

export default Home

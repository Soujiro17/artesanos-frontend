import React from 'react'
import styles from './styles.module.scss'
import { SectionCategories, SectionMap, Presentacion, Layout } from '../../components'

const Home = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <Presentacion />
        <div className={styles.circle} />
        <SectionCategories />
        <SectionMap />
      </main>
    </Layout>
  )
}

export default Home

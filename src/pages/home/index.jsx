import React from 'react'
import styles from './styles.module.scss'
import { SectionCategories, SectionMap, Presentacion, Layout } from '../../components'

const Home = () => {
  console.log(process.env.REACT_API_URL)

  return (
    <Layout>
      <main className={styles.main}>
        <Presentacion />
        <SectionCategories />
        <SectionMap />
      </main>
    </Layout>
  )
}

export default Home

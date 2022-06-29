import React from 'react'
import styles from './styles.module.scss'
import { Header, SectionCategories, SectionMap, Presentacion, FooterLogo } from '../../components'

const Home = () => {
  return (
    <>
      <Header /> {/* 17vh */}
      <main className={styles.main}>
        {/* <Carousel imgs={imgs} /> */}
        <Presentacion />
        <div className={styles.circle} />
        <SectionCategories />
        <SectionMap />
        <FooterLogo lineWidth='80%' />
      </main>
    </>
  )
}

export default Home

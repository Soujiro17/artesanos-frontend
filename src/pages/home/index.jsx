import React from 'react'
import styles from './styles.module.scss'
import { Header, Carousel, SectionCategories, SectionMap, HeaderLogo, Spinner } from '../../components'
import { imgs } from '../../data/imgs'

const Home = () => {


  return (
    <>
      <Header /> {/* 17vh */}
      <main className={styles.main}>
        <Carousel imgs={imgs} />
        <SectionCategories />
        <SectionMap />
      </main>
      <footer><HeaderLogo borderTop left /></footer>
    </>
  )
}

export default Home
import React from 'react'
import styles from './styles.module.scss'
import { Header, Carousel } from '../../components'
import { imgs } from '../../data/imgs'

const Home = () => {
  return (
    <>
      <Header /> {/* 17vh */}
      <main className={styles.main}>
        <Carousel imgs={imgs} />
      </main>
    </>
  )
}

export default Home
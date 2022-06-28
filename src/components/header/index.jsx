import React from 'react'
import { Navbar } from '..'
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
    </header>
  )
}

export default Header

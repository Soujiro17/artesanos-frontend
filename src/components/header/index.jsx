import React from 'react'
import { Navbar, HeaderLogo } from '..'
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo borderBottom />
      <Navbar />
    </header>
  )
}

export default Header

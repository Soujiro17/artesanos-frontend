import React from 'react'
import NavbarItem from '../navbarItem'
import styles from './styles.module.scss'
import useNavbarItems from '../../hooks/useNavbarItems'

const Navbar = () => {
  const navItems = useNavbarItems()

  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav_list}>
        {navItems.map((item, i) => <NavbarItem {...item} key={i} />)}
      </ul>
    </nav>
  )
}

export default Navbar

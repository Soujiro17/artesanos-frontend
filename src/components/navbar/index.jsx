import React from 'react'
import NavbarItem from '../navbarItem'
import styles from './styles.module.scss'
import useNavbarItems from '../../hooks/useNavbarItems'
import { Link } from 'react-router-dom'
import OrangeLine from '../orangeLine'

const Navbar = () => {
  const navItems = useNavbarItems()

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.nav_wrapper}>
          <div className={styles.logo}>
            <Link to='/'>
              <img src='/logo.png' alt='logo' className={styles.logo_img} />
            </Link>
          </div>
          <ul className={styles.nav_list}>
            {navItems.map((item, i) => <NavbarItem {...item} key={i} />)}
          </ul>
        </div>
        <OrangeLine />
      </div>
    </nav>
  )
}

export default Navbar

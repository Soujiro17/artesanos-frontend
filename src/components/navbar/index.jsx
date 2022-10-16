import React, { useState } from 'react'
import NavbarItem from '../navbarItem'
import styles from './styles.module.scss'
import useNavbarItems from '../../hooks/useNavbarItems'
import { Link } from 'react-router-dom'
import OrangeLine from '../orangeLine'
import clsx from 'clsx'
import { imgs } from '../../data/images'

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => setOpenMenu(!openMenu)

  const navItems = useNavbarItems()

  const navItemsList = clsx({
    [styles.nav_list]: true,
    [styles.active_navbar]: openMenu
  })

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.nav_list_wrapper}>
          <div className={styles.nav_wrapper}>
            <div className={styles.logo}>
              <Link to='/'>
                <img src={imgs.logo} alt='logo' className={styles.logo_img} />
              </Link>
            </div>
            <ul className={navItemsList}>
              {navItems.map((item, i) => {
                if (!item) return null
                return <NavbarItem {...item} key={i} />
              })}
            </ul>
          </div>
          <div className={styles.list_icon} onClick={handleOpenMenu}>
            <img src='/icons/list.svg' className={styles.list_svg} alt='burger' />
          </div>
        </div>
        <OrangeLine className={styles.orange_line} />
      </div>
    </nav>
  )
}

export default Navbar

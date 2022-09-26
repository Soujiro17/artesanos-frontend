import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const NavbarItem = ({ name, url, onClick, ...rest }) => {
  return (
    <li className={styles.nav_item} {...rest} onClick={onClick}>
      <Link to={url || '#'}>{name}</Link>
    </li>
  )
}

export default NavbarItem

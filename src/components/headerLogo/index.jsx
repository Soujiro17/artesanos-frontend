import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

const HeaderLogo = ({ borderTop, borderBottom, left, right }) => {
  const logoClassname = clsx({
    [styles.logo]: true,
    [styles.borderTop]: borderTop,
    [styles.borderBottom]: borderBottom,
    [styles.left]: left,
    [styles.right]: right
  })

  return <div className={logoClassname}>LOGOTIPO</div>
}

export default HeaderLogo

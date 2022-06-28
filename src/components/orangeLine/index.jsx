import React from 'react'
import styles from './styles.module.scss'

const OrangeLine = ({ className, ...rest }) => {
  return (
    <hr className={`${styles.line} ${className}`} {...rest} />
  )
}

export default OrangeLine

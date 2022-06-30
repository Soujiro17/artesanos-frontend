import React from 'react'
import styles from './styles.module.scss'

const OrangeLine = ({ className, width, ...rest }) => {
  return (
    <hr className={`${styles.line} ${className}`} {...rest} style={{ width, ...rest }} />
  )
}

export default OrangeLine

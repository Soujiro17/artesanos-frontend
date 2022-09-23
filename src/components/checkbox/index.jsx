import React from 'react'
import styles from './styles.module.scss'

const Checkbox = ({ register, name, label = '', ...rest }) => {
  return (
    <p>
      <input className={`${rest.className} ${styles.checkbox}`} type='checkbox' id={name} {...register(name)} />
      <label htmlFor={name}>{label}</label>
    </p>
  )
}

export default Checkbox

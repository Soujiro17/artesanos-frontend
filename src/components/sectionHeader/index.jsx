import React from 'react'
import styles from './styles.module.scss'

const SectionHeader = ({ name }) => {
  return (
    <header className={styles.section_header}>
        <hr className={styles.line} />
        <h2 className={styles.name}>{name}</h2>
    </header>
  )
}

export default SectionHeader
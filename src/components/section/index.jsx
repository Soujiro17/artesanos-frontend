import React from 'react'
import { SectionHeader } from '..'
import styles from './styles.module.scss'

const Section = ({ name, children }) => {
  return (
    <section className={styles.section}>
        <SectionHeader name={name}/>
        <div className={styles.section_body}>
            {children}
        </div>
    </section>
  )
}

export default Section
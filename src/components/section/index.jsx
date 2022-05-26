import clsx from 'clsx'
import React from 'react'
import { SectionHeader } from '..'
import styles from './styles.module.scss'

const Section = ({ name, children, className }) => {

  const sectionClassname = clsx({
    [styles.section]: true,
    [className]: className
  })

  return (
    <section className={sectionClassname}>
        <SectionHeader name={name}/>
        <div className={styles.section_body}>
            {children}
        </div>
    </section>
  )
}

export default Section
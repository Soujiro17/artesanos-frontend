import clsx from 'clsx'
import React from 'react'
import { SectionHeader } from '..'
import styles from './styles.module.scss'

const Section = ({ name, children, className, id }) => {
  const sectionClassname = clsx({
    [styles.section]: true,
    [className]: className
  })

  return (
    <section className={sectionClassname} id={id} style={{ marginTop: name ? '0' : '3rem' }}>
      <div className={styles.section_wrapper}>
        {
         name && <SectionHeader name={name} />
        }
        <div className={styles.section_body}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section

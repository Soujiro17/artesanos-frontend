import React from 'react'
import OrangeLine from '../orangeLine'
import Section from '../section'
import styles from './styles.module.scss'

const index = ({ lineWidth }) => {
  return (
    <Section>
      <div className={styles.footer_logo}>
        <OrangeLine style={{ width: lineWidth }} className={styles.orange_line} />
        <img src='/logo.png' className={styles.logo} />
      </div>
    </Section>
  )
}

export default index

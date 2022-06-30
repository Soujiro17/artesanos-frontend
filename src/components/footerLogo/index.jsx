import React from 'react'
import OrangeLine from '../orangeLine'
import Section from '../section'
import styles from './styles.module.scss'

const FooterLogo = ({ lineWidth = '80%' }) => {
  return (
    <Section>
      <div className={styles.footer_logo}>
        <OrangeLine width={lineWidth} className={styles.orange_line} />
        <img src='/logo.png' className={styles.logo} />
      </div>
    </Section>
  )
}

export default FooterLogo

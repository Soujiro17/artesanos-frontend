import React from 'react'
import { imgs } from '../../data/images'
import OrangeLine from '../orangeLine'
import Section from '../section'
import styles from './styles.module.scss'

const FooterLogo = ({ lineWidth = '80%' }) => {
  return (
    <Section>
      <div className={styles.footer_logo}>
        <OrangeLine width={lineWidth} className={styles.orange_line} />
        <img src={imgs.logo} className={styles.logo} alt='logo' />
      </div>
    </Section>
  )
}

export default FooterLogo

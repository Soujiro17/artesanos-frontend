import React from 'react'
import styles from './styles.module.scss'
import ReactDOM from 'react-dom'

const Spinner = ({ fullScreen = false }) => {
  const spinner = <div className={styles.spinner} />

  if (!fullScreen) return spinner

  return ReactDOM.createPortal((
    <div className={fullScreen ? styles.fullscreen : ''}>
      {spinner}
    </div>
  ), document.getElementById('loading'))
}

export default Spinner

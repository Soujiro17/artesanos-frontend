import React from 'react'
import styles from './styles.module.scss'
import ReactDOM from 'react-dom'

const Spinner = ({ fullScreen = false }) => {
  const spinner = (
    <div className={styles.lds_ring}><div /><div /><div /><div /></div>
  )

  if (!fullScreen) return <div className={styles.spinner_wrapper}>spinner</div>

  return ReactDOM.createPortal((
    <div className={fullScreen ? styles.fullscreen : ''}>
      {spinner}
    </div>
  ), document.getElementById('loading'))
}

export default Spinner

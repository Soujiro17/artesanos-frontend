import React from 'react'
import styles from './styles.module.scss'
import ReactDOM from 'react-dom'

const Spinner = () => {
  return ReactDOM.createPortal((
    <div className={styles.spinner_wrapper}>
      <div className={styles.spinner}/>
    </div>
  ), document.getElementById("loading"))
}

export default Spinner
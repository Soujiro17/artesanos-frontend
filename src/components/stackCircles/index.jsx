import React from 'react'
import styles from './styles.module.scss'

const Circle = () => {
  return (
    <div className={styles.circle} />
  )
}

const StackCircles = ({ rows = 13, columns = 3, className = '', style, left = false, right = false }) => {
  const rowsArray = [...Array(parseInt(rows))]
  const columnsArray = [...Array(parseInt(columns))]

  return (
    <div className={`${styles.stack_circles} ${className} ${left ? styles.left : right ? styles.right : ''}`} style={style}>
      {
        rowsArray.map((row, i) =>
          <div key={i} className={styles.row}>
            {columnsArray.map((column, j) => <Circle key={`${i}${j}`} />)}
          </div>
        )
      }
    </div>
  )
}

export default StackCircles

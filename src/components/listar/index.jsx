import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const items = [
  {
    imageUrl: 'https://www.unir.net/wp-content/uploads/2016/05/shutterstock_116554585.jpg',
    url: '#',
    name: 'Artesano'
  },
  {
    imageUrl: 'https://www.unir.net/wp-content/uploads/2016/05/shutterstock_116554585.jpg',
    url: '#',
    name: 'Artesano'
  },
  {
    imageUrl: 'https://www.unir.net/wp-content/uploads/2016/05/shutterstock_116554585.jpg',
    url: '#',
    name: 'Artesano'
  },
  {
    imageUrl: 'https://www.unir.net/wp-content/uploads/2016/05/shutterstock_116554585.jpg',
    url: '#',
    name: 'Artesano'
  },
  {
    imageUrl: 'https://www.unir.net/wp-content/uploads/2016/05/shutterstock_116554585.jpg',
    url: '#',
    name: 'Artesano'
  },
]

const Listar = () => {
  return (
    <div className={styles.listar}>
      <div className={styles.items}>
        {items.map(item => 
          <Link to={item.url} className = {styles.item_link}>
            <img src={item.imageUrl} className = {styles.item_img} alt = "" />
            <div className={styles.item_name}>{item.name}</div>
          </Link>)}
      </div>
      <div className={styles.paginas}>
        <div className={styles.pagina}>1</div>
        <div className={styles.pagina}>1</div>
        <div className={styles.pagina}>1</div>
        <div className={styles.pagina}>1</div>
      </div>
    </div>
  )
}

export default Listar
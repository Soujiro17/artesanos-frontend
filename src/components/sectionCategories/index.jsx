import React from 'react'
import Section from '../section'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const imgUrl = "https://www.abaenglish.com/es/wp-content/uploads/sites/2/2019/07/artesano-en-taller.jpg"

const SectionCategories = () => {
  return (
    <Section name="CATEGORÍAS">
        <div className={styles.header}>
            <p>Categorías (de la A-Z)</p>
        </div>
        <div className={styles.content}>
            <Link to="/" className={styles.categoria_wrapper}>
                <img src={imgUrl} alt = "" className={styles.categoria_img} />
            </Link>
            <Link to="/" className={styles.categoria_wrapper}>
                <img src={imgUrl} alt = "" className={styles.categoria_img} />
            </Link>
            <Link to="/" className={styles.categoria_wrapper}>
                <img src={imgUrl} alt = "" className={styles.categoria_img} />
            </Link>
        </div>
        <footer className={styles.footer}>
            <p className={styles.search}>Buscar</p>
            <div className={styles.search_group}>
                <input placeholder='Categoría' className='input' />
                <button className={styles.margin + ' btn'}>Buscar</button>
            </div>
        </footer>
    </Section>
  )
}

export default SectionCategories
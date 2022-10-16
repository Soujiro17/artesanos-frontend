/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import Section from '../section'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../spinner'
import StackCircles from '../stackCircles'
import { getCategorias } from '../../api/categorias'

const Categoria = ({ categoria }) => {
  return (
    <Link to={`/categoria/${categoria._id}`} className={styles.categoria_wrapper} key={categoria._id}>
      <img src={categoria.foto?.url || '/img/categoria_no_encontrada.png'} alt='' className={styles.categoria_img} />
      <div className={styles.categoria_nombre}>{categoria.nombre}</div>
    </Link>
  )
}

const Categorias = ({ nombre }) => {
  const { data, isLoading, isError } = useQuery(['categorias'], () => getCategorias({ query: { pagination: false } }))

  if (isLoading) return <Spinner />

  if (isError) return <p className='error'>Error al cargar las categorías</p>

  if (data?.length === 0) return <p className='error'>No hay categorías para mostrar</p>

  return data?.docs?.filter(categoria => categoria.nombre.toLowerCase().includes(nombre.toLowerCase())).map((categoria) => <Categoria key={categoria._id} categoria={categoria} />)
}

const SectionCategories = () => {
  const [nombre, setNombre] = useState('')

  const handleNombre = (e) => setNombre(e.target.value)

  return (
    <>
      <StackCircles left />
      <Section name='CATEGORÍAS'>
        <div className={styles.header}><p>A-Z</p></div>
        <div className={styles.content}><Categorias nombre={nombre} /></div>
      </Section>
      <section className={styles.filter}>
        <img src='/home_circles.png' className={styles.circles_home} alt='circulos' />
        <div className={styles.footer_cont}>
          <p className={styles.search}>¿No encuentras lo que buscas? <span>Escríbelo!</span></p>
          <p className={styles.input_text}>Busca aquí</p>
          <div className={styles.search_group}>
            <input placeholder='Categoría' className={`${styles.search_input} input`} onChange={handleNombre} />
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionCategories

import React from 'react'
import { Layout, OrangeLine, Section, StackCircles } from '../../components'
import { imgs } from '../../data/images'
import styles from './styles.module.scss'

const AcercaDe = () => {
  return (
    <Layout>
      <Section>
        <div className={styles.acerca_de}>
          <h2 className={`color-p ${styles.acerca_de_title}`}>Acerca de Nosotros</h2>
          <div className={styles.acerca_de_content}>
            <div className={styles.logo_wrapper}>
              <img src={imgs.acerca_de_nosotros_circulo_azul} alt='circle' className={`${styles.circle} ${styles.blue_circle}`} />
              <img src={imgs.acerca_de_nosotros_circulo_rayado} alt='circle' className={`${styles.circle} ${styles.gray_circle}`} />
              <img src={imgs.acerca_de_nosotros} alt='san miguel' className={styles.logo} />
            </div>
            <div className={styles.acerca_de_info}>
              <h2>Sobre el proyecto</h2>
              <p>Esta Plataforma digital para la promoción y geolocalización de emprendedores artesanos en la comuna de San Miguel es un proyecto de innovación desarrollado por la Universidad de Valparaíso (UV) en alianza con la I. Municipalidad de San Miguel.</p>
              <p>Esta iniciativa fue liderada por la Escuela de Negocios Internacionales y contó con la participación de estudiantes y académicos de las escuelas de Ingeniería Civil Informática, Diseño y el Campus Santiago de dicha casa de estudios superiores.</p>
              <p>En la web se incluyen datos, fotografías, reseñas y geolocalización de las/os artesanas/os de la comuna, información que, a través, de la Municipalidad podrán actualizar. Es una herramienta útil para que las personas no solo busquen artículos y productos desde cualquier dispositivo, sino también puedan saber exactamente dónde comprarlos y quién es el o la artesano/a detrás de cada obra o artículo.</p>
              <OrangeLine />
              <h2>Objetivo</h2>
              <p>El objetivo de esta plataforma es promover a los y las artesanas de la comuna (geolocalización), poniendo en valor sus trabajos e historias personales, a través de este recurso tecnológico.</p>
              <StackCircles rows={2} columns={16} className={styles.circles} />
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default AcercaDe

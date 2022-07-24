import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader, Layout, Section } from '../../components'
import styles from './styles.module.scss'

const Administracion = () => {
  return (
    <Layout>
      <main className={styles.administracion}>
        <AdminHeader />
        <Section>
          <Outlet />
        </Section>
      </main>
    </Layout>
  )
}

export default Administracion

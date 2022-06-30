import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader, Layout } from '../../components'
import styles from './styles.module.scss'

const Administracion = () => {
  return (
    <Layout>
      <main className={styles.administracion}>
        <AdminHeader />
        <Outlet />
      </main>
    </Layout>
  )
}

export default Administracion

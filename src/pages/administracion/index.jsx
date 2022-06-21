import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader, Header } from '../../components'

const Administracion = () => {
  return (
    <>
      <Header />
      <main>
        <AdminHeader />
        <Outlet />
      </main>
    </>
  )
}

export default Administracion

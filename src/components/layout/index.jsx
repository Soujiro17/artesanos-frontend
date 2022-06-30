import React from 'react'
import { Header, FooterLogo } from '..'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <FooterLogo lineWidth='80%' />
    </>
  )
}

export default Layout

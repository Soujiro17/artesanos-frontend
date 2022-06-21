import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AdminCategorias, AdminPymes, AdminRedesSociales, AdminRubros } from '../components'
import useAuth from '../hooks/useAuth'
import Home from '../pages/home'
import Categorias from '../pages/categorias'
import Artesanos from '../pages/artesanos'
import Producto from '../pages/producto'
import Categoria from '../pages/categoria'
import Administracion from '../pages/administracion'
import Login from '../pages/login'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categorias' element={<Categorias />} />
        <Route path='/categorias/:id' element={<Categoria />} />
        <Route path='/producto/:id' element={<Producto />} />
        <Route path='/artesanos' element={<Artesanos />} />
        <Route path='/login' element={<Login />} />
        <Route path='/administracion' element={<RequireAuth><Administracion /></RequireAuth>}>
          <Route path='categorias' element={<AdminCategorias />} />
          <Route path='pymes' element={<AdminPymes />} />
          <Route path='redes-sociales' element={<AdminRedesSociales />} />
          <Route path='rubros' element={<AdminRubros />} />
        </Route>
        <Route path='*' element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

const RequireAuth = ({ children }) => {
  const auth = useAuth()

  const location = useLocation()

  if (!auth?.auth) { return <Navigate to='/login' state={{ from: location }} replace /> }

  return children
}

export default AppRouter

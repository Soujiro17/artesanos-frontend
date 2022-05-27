import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Home from '../pages/home'
import Categorias from '../pages/categorias'
import Artesanos from '../pages/artesanos'

const AppRouter = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Home />} /> 
            <Route path='/categorias' element = {<Categorias />} />
            <Route path='/artesanos' element = {<Artesanos />} />
        </Routes>
    </BrowserRouter>
  )
}

const PrivateRoute = ({ element: Children, path, ...rest }) => {

  const auth = useAuth()

  const location = useLocation()

  if(!auth?.user) return <Navigate to='/login' state={{ from: location }} replace />

  return <Route path={path} element = {<Children {...rest} />} />
};

export default AppRouter
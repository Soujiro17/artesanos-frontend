import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Home from '../pages/home'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Home />} /> 
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
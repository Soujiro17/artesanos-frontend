import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AdminCategorias, AdminProductos, AdminPymes, AdminRedesSociales, AdminRubros, Layout, Spinner } from '../components'
import useAuth from '../hooks/useAuth'

const Home = React.lazy(() => import('../pages/home'))
const Categorias = React.lazy(() => import('../pages/categorias'))
const Artesanos = React.lazy(() => import('../pages/artesanos'))
const Producto = React.lazy(() => import('../pages/producto'))
const Productos = React.lazy(() => import('../pages/productos'))
const Categoria = React.lazy(() => import('../pages/categoria'))
const Administracion = React.lazy(() => import('../pages/administracion'))
const Login = React.lazy(() => import('../pages/login'))
const AdminArtesanos = React.lazy(() => import('../components/adminArtesanos'))
const Artesano = React.lazy(() => import('../pages/artesano'))
const Geolocalizar = React.lazy(() => import('../pages/geolocalizar'))
const AcercaDe = React.lazy(() => import('../pages/acercaDe'))

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner fullScreen />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/geolocalizar' element={<Geolocalizar />} />
          <Route path='/categoria/:id' element={<Categoria />} />
          <Route path='/producto/:id' element={<Producto />} />
          <Route path='/productos/:id' element={<Productos />} />
          <Route path='/artesanos' element={<Artesanos />} />
          <Route path='/artesano/:id' element={<Artesano />} />
          <Route path='/acerca-de' element={<AcercaDe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/administracion' element={<RequireAuth><Administracion /></RequireAuth>}>
            <Route path='' element={<p>Test</p>} index/>
            <Route path='categorias' element={<AdminCategorias />} />
            <Route path='pymes' element={<AdminPymes />} />
            <Route path='redes-sociales' element={<AdminRedesSociales />} />
            <Route path='rubros' element={<AdminRubros />} />
            <Route path='artesanos' element={<AdminArtesanos />} />
            <Route path='productos' element={<AdminProductos />} />
          </Route>
          <Route path='*' element={<Layout><p style={{ textAlign: 'center' }}>Página no encontrada</p></Layout>} />
        </Routes>
      </Suspense>
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

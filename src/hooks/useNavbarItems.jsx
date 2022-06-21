import useAuth from './useAuth'

const useNavbarItems = () => {
  const auth = useAuth()

  const isLoggedIn = auth?.auth

  return (
    [
      {
        name: 'Inicio',
        url: '/'
      },
      {
        name: 'Categorías',
        url: '/categorias'
      },
      {
        name: 'Artesanos',
        url: '/artesanos'
      },
      {
        name: 'Geolocalizar',
        url: '#geolocalizar'
      },
      {
        name: 'Acerca de',
        url: '/'
      },
      {
        name: isLoggedIn ? 'Administrar' : 'Iniciar sesión',
        url: '/login'
      },
      isLoggedIn
        ? {
            name: 'Cerrar sesión',
            url: '/',
            onClick: () => auth?.cerrarSesion()
          }
        : {}
    ]
  )
}

export default useNavbarItems

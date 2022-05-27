import { axiosPublic } from "../services/axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [categorias, setCategorias] = useState({})


  const getCategorias = async () => {
    await axiosPublic.get('/categoria')
      .then((res) => setCategorias(res.data))
      .catch((err) => toast.error("Error al obtener las categorías, vuelve a intentarlo más tarde"))
  }

  useEffect(() => {
    getCategorias()
    return () => {
      getCategorias([])
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, getCategorias, categorias }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../components'
import useAuth from '../../hooks/useAuth'
import styles from './styles.module.scss'

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const auth = useAuth()

  const navigate = useNavigate()

  const loginMutation = useMutation(auth?.login, {
    onSuccess: () => {
      toast.success('Sesión iniciada con éxito')
    },
    onError: (err) => {
      toast.error(err?.response?.data)
    }
  })

  const onSubmit = (data) => {
    loginMutation?.mutate(data)
  }

  useEffect(() => {
    if (auth?.auth) {
      navigate('/administracion')
    }
  }, [auth?.auth])

  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
        {loginMutation?.isLoading && <Spinner fullScreen />}
        {errors.rut && <span>Rut es requerido</span>}
        <input
          defaultValue=''
          type='email'
          placeholder='RUT. Ej: aaa_bb@gmail.com'
          className='input'
          {...register('email', { required: true })}
        />
        {errors.password && <span>Contraseña es requerida</span>}
        <input
          defaultValue=''
          type='password'
          placeholder='Contraseña'
          className='input'
          {...register('password', { required: true })}
        />
        <button type='submit' className='btn'>
          Iniciar sesión
        </button>
        <p>Olvidaste tu contraseña?</p>
      </form>
    </div>
  )
}

export default Login

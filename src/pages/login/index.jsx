import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { OrangeLine, Spinner } from '../../components'
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
      {loginMutation?.isLoading && <Spinner fullScreen />}
      <div className={styles.wrapper}>
        <div className={styles.login_header}>
          <p className={`color-p ${styles.text}`}>Bienvenido</p>
          <p className={`bb-gc-1px ${styles.text}`}>Bienvenido</p>
          <OrangeLine width='80%' />
        </div>
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.logo}>
            <Link to='/'>
              <img src='/logo.png' className={styles.logo_img} />
            </Link>
          </div>
          <div className={styles.form_group}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor='email'>Email</label>
              <input
                defaultValue=''
                id='email'
                type='email'
                placeholder='Email. Ej: aaa_bb@gmail.com'
                className={`${styles.input} input ${errors.email ? 'input-error' : ''}`}
                {...register('email', { required: true })}
              />
              {/* {errors.email && <span>Email es requerido</span>} */}
            </div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor='password'>Contraseña</label>
              <input
                defaultValue=''
                id='password'
                type='password'
                placeholder='Contraseña'
                className={`${styles.input} input ${errors.password ? 'input-error' : ''}`}
                {...register('password', { required: true })}
              />
              {/* {errors.password && <span>Contraseña es requerida</span>} */}
            </div>
            <button type='submit' className='btn accent'>
              ENTRAR
            </button>
          </div>
          {/* <p>Olvidaste tu contraseña?</p> */}
        </form>
      </div>
    </div>
  )
}

export default Login

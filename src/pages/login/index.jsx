import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'

const Login = () => {

    const { register, formState: { errors }, handleSubmit, watch } = useForm()

    const onSubmit = () => console.log("submited")

  return (
    <div className={styles.container}>
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            {errors.rut && <span>Rut es requerido</span>}
            <input defaultValue="" placeholder='RUT. Ej: 20442796' className='input' {...register("rut", { required: true })} />
            {errors.password && <span>Contraseña es requerida</span>}
            <input defaultValue="" type="password" placeholder='Contraseña' className='input' {...register("password", { required: true })} />
            <button type='submit' className='btn'>Iniciar sesión</button>
            <p>Olvidaste tu contraseña?</p>
        </form>
    </div>
  )
}

export default Login
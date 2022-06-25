import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import X from '../icons/X'

const AdminArtesanos = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Artesano', 'artesanos')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const { data, isLoading: isLoadingData } = useQuery('artesanos', () => api.getArtesanos({ query: { pagination: false } }))

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearArtesano, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarArtesano, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarArtesano, mutatorConfig.delete)

  const onSubmit = (data) => {
    if (id) mutateActualizar({ values: data, _id: id })
    else mutateCrear({ values: data })

    setValue('nombres', '')
    setValue('apellidos', '')
    setValue('rut', '')
    setIsUpdating(false)
    setId('')
  }

  const handleOnClickSet = ({ _id, nombres, apellidos, rut }) => {
    setValue('nombres', nombres)
    setValue('apellidos', apellidos)
    setValue('rut', rut)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombres', '')
    setValue('apellidos', '')
    setValue('rut', '')
    setValue('password', '')
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear Artesano</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombres && <span>Nombres es requerido</span>}
          <input defaultValue='' {...register('nombres', { required: true })} placeholder='Nombres artesano' />
          {errors.apellidos && <span>Apellidos es requerido</span>}
          <input defaultValue='' {...register('apellidos', { required: true })} placeholder='Apellidos artesano' />
          {errors.rut && <span>RUT es requerido</span>}
          <input defaultValue='' {...register('rut', { required: true })} placeholder='RUT artesano' />
          {errors.password && <span>Contraseña es requerido</span>}
          <input defaultValue='' {...register('password', { required: true })} placeholder='Contraseña artesano' />
          <button type='submit'>{isUpdating ? 'Actualizar artesano' : 'Agregar artesano'}</button>
          {isUpdating && <button onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div>
        <div>
          <ul>
            {
              isLoadingData
                ? <Spinner />
                : data?.docs?.map(item =>
                  <li key={item._id}>
                    <p onClick={() => handleOnClickSet({ ...item })}>Nombres: {item.nombres}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>Apellidos: {item.apellidos}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>RUT: {item.rut}</p>
                    <X onClick={() => remove(item._id)} />
                  </li>
                )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminArtesanos

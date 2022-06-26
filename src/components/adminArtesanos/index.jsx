import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
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
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizar({ values: formData, _id: id })
    else mutateCrear({ values: formData })

    clearFields()
  }

  const handleOnClickSet = ({ _id, nombres, apellidos, rut }) => {
    setValue('nombres', nombres)
    setValue('apellidos', apellidos)
    setValue('rut', rut)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombres', '')
    setValue('apellidos', '')
    setValue('rut', '')
    setValue('foto', [])
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
          <input defaultValue='' {...register('rut', { required: true })} placeholder='ej: 111111111' />
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
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

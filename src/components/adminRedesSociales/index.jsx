import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import X from '../icons/X'

const AdminRedesSociales = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Red social', 'redes_sociales')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const queryClient = useQueryClient()

  const data = queryClient.getQueryData('redes_sociales')

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearRedSocial, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarRedSocial, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarRedSocial, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizar({ values: formData, _id: id })
    else mutateCrear({ values: formData })

    setValue('nombre', '')
    setValue('foto', null)
    setIsUpdating(false)
    setId('')
  }

  const handleOnClickSet = (_id, nombre) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombre', '')
    setValue('foto', null)
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear red social</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre red social' />
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          <button type='submit'>{isUpdating ? 'Actualizar red social' : 'Agregar red social'}</button>
          {isUpdating && <button onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div>
        <div>
          <ul>
            {
              !data
                ? <Spinner />
                : data?.map(item =>
                  <li key={item._id}>
                    <p onClick={() => handleOnClickSet(item._id, item.nombre)}>{item.nombre}</p>
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

export default AdminRedesSociales

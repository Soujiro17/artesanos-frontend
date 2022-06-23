import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import X from '../icons/X'

const AdminRedesSociales = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Red social', '')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const { data, isLoading: isLoadingData } = useQuery('redes_sociales', () => api.getRedesSociales())

  /*

    UTILIZAR COMPRESS JS PARA BAJAR EL PESO DE LAS IMÁGENES POR FAVOR

  */

  console.log(data)

  const { mutate: mutateCrear, isLoadingCreate } = useMutation(api.crearRedSocial, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoadingUpdate } = useMutation(api.actualizarRedSocial, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoadingDelete } = useMutation(api.eliminarRedSocial, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) return mutateActualizar({ values: formData, _id: id })

    return mutateCrear({ values: formData })
  }

  const handleOnClickSet = (_id, nombre) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const removeCategory = (_id) => {
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombre', '')
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
              isLoadingData
                ? <Spinner />
                : data?.map(item =>
                  <li key={item._id}>
                    <p onClick={() => handleOnClickSet(item._id, item.nombre)}>{item.nombre}</p>
                    <X onClick={() => removeCategory(item._id)} />
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

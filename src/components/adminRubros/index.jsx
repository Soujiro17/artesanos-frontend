import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import X from '../icons/X'

const AdminRubros = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Rubro', 'rubros')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const queryClient = useQueryClient()

  const data = queryClient.getQueryData('rubros')

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearRubro, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarRubro, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarRubro, mutatorConfig.delete)

  const onSubmit = (data) => {
    if (id) mutateActualizar({ values: data, _id: id })
    else mutateCrear({ values: data })

    clearFields()
  }

  const handleOnClickSet = (_id, nombre) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
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
        <p>Crear rubro</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre rubro' />
          <button type='submit'>{isUpdating ? 'Actualizar rubro' : 'Agregar rubro'}</button>
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

export default AdminRubros

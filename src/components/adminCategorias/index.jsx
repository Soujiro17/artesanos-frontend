import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import X from '../icons/X'

const AdminCategorias = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Categoria', 'categorias')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const { data: categorias, isLoading: isLoadingCategorias } = useQuery('categorias', () => api.getCategorias({ query: { pagination: false } }))

  const { mutate: mutateCrearCategria, isLoadingCreate } = useMutation(api.crearCategoria, mutatorConfig.create)
  const { mutate: mutateActualizarCategoria, isLoadingUpdate } = useMutation(api.actualizarCategoria, mutatorConfig.update)
  const { mutate: mutateEliminarCategoria, isLoadingDelete } = useMutation(api.eliminarCategoria, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) return mutateActualizarCategoria({ values: formData, _id: id })

    return mutateCrearCategria(formData)
  }

  const handleOnClickSet = (_id, nombre) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const removeCategory = (_id) => {
    mutateEliminarCategoria({ _id })
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
        <p>Crear categoria</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre categoría' />
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          <button type='submit'>{isUpdating ? 'Actualizar categoría' : 'Agregar categoría'}</button>
          {isUpdating && <button onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div>
        <div>
          <ul>
            {
              isLoadingCategorias
                ? <Spinner />
                : categorias?.docs?.map(categoria =>
                  <li key={categoria._id}>
                    <p onClick={() => handleOnClickSet(categoria._id, categoria.nombre)}>{categoria.nombre}</p>
                    <X onClick={() => removeCategory(categoria._id)} />
                  </li>
                )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminCategorias

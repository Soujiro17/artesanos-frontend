import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'

const AdminCategorias = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')
  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const { data: categorias, isLoading: isLoadingCategorias } = useQuery('categorias', () => api.getCategorias({ query: { pagination: false } }))

  const queryClient = useQueryClient()

  const { mutate: mutateCrearCategria, isLoading } = useMutation(api.crearCategoria, {
    onSuccess: () => {
      toast.success('Categoría creada con éxito')
      queryClient.prefetchQuery('categorias')
    },
    onError: (res) => {
      toast.error(res.response.data)
    }
  })

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    mutateCrearCategria(formData)
  }

  const handleOnClickSet = (_id, nombre) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const clearFields = () => {
    setValue('nombre', '')
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {isLoading && <Spinner fullScreen />}
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
                : categorias?.docs?.map(categoria => <li key={categoria._id} onClick={() => handleOnClickSet(categoria._id, categoria.nombre)}>{categoria.nombre}</li>)
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminCategorias

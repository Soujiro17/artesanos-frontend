import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'

const AdminCategorias = () => {
  const { register, formState: { errors }, handleSubmit } = useForm()

  const api = useApi()

  const { mutate: mutateCrearCategria, isLoading } = useMutation(api.crearCategoria, {
    onSuccess: () => {
      toast.success('Categoría creada con éxito')
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

  return (
    <div>
      {isLoading && <Spinner fullScreen />}
      <p>Crear categoria</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {errors.nombre && <span>Nombre es requerido</span>}
        <input defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre categoría' />
        <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
        <button type='submit'>Agregar categoría</button>
      </form>
    </div>
  )
}

export default AdminCategorias

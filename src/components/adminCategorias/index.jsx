import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'

const AdminCategorias = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Categoria', 'categorias')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const api = useApi()

  const queryClient = useQueryClient()

  const data = queryClient.getQueryData('categorias')

  const { mutate: mutateCrearCategria, isLoading: isLoadingCreate } = useMutation(api.crearCategoria, mutatorConfig.create)
  const { mutate: mutateActualizarCategoria, isLoading: isLoadingUpdate } = useMutation(api.actualizarCategoria, mutatorConfig.update)
  const { mutate: mutateEliminarCategoria, isLoading: isLoadingDelete } = useMutation(api.eliminarCategoria, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizarCategoria({ values: formData, _id: id })
    else mutateCrearCategria({ values: formData })

    clearFields()
  }

  const handleOnClickSet = ({ _id, nombre }) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    mutateEliminarCategoria({ _id })
  }

  const clearFields = () => {
    setValue('nombre', '')
    setValue('foto', [])
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div className='form-container'>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <h2>Crear categoria</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input className='input' defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre categoría' />
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          <button className='btn btn-effect bg-cyan' type='submit'>{isUpdating ? 'Actualizar categoría' : 'Agregar categoría'}</button>
          {isUpdating && <button className='btn btn-effect bg-cyan' onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div className='table-container'>
        <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {
            !data
              ? <Spinner />
              : data?.docs?.map(item =>
                <tr key={item._id}>
                  <td>{item.nombre}</td>
                  <AlterRow onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => remove(item._id)} />
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminCategorias

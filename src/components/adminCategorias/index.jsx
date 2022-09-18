import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import Spinner from '../spinner'
import { toFormData } from '../../utilities/toFormData'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import { actualizarCategoria, crearCategoria, eliminarCategoria } from '../../api/categorias'
import useMutateCrud from '../../hooks/useMutateCrud'

const AdminCategorias = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Categoria', 'categorias')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData('categorias')

  const { mutateCreate, mutateUpdate, mutateDelete } = useMutateCrud(crearCategoria, actualizarCategoria, eliminarCategoria, mutatorConfig)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateUpdate({ values: formData, _id: id })
    else mutateCreate({ values: formData })

    clearFields()
  }

  const handleOnClickSet = ({ _id, nombre }) => {
    setValue('nombre', nombre)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    mutateDelete({ _id })
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
          <input className={`${errors.nombre ? 'error-campo' : ''} input`} defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre categoría' />
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

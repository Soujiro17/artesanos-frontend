import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import withForm from '../withForm'
import FormInput from '../formInput'
import AdminTable from '../adminTable'
import { categoriaHeaders } from '../../data/tableHeaders'

const AdminCategorias = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form, foto, onClearPicture }) => {
  const { register, formState: { errors }, handleSubmit } = form

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['categorias'])

  return (
    <>
      <div className='form-container'>
        <h2>Crear categoria</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          <FormInput errors={errors} register={register} name='nombre' placeholder='Nombre categoría' />
          <FormInput errors={errors} register={register} name='foto' accept='image/*' type='file' foto={foto} onClearPicture={onClearPicture} />
          <button className='btn btn-effect bg-cyan' type='submit'>{idToUpdate ? 'Actualizar categoría' : 'Agregar categoría'}</button>
          <button className='btn btn-effect bg-cyan' onClick={onClear}>Limpiar</button>
        </form>
      </div>
      <AdminTable data={data} handleOnClickSet={onClickSet} onRemove={onRemove} path='categoria' headers={categoriaHeaders} />
    </>
  )
}

export default withForm(AdminCategorias)('categorias')

import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Spinner from '../spinner'
import AlterRow from '../alterRow'
import withForm from '../withForm'

const AdminCategorias = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form }) => {
  const { register, formState: { errors }, handleSubmit } = form

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['categorias'])

  return (
    <>
      <div className='form-container'>
        <h2>Crear categoria</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          <input className={`${errors.nombre ? 'error-campo' : ''} input`} defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre categoría' />
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          <button className='btn btn-effect bg-cyan' type='submit'>{idToUpdate ? 'Actualizar categoría' : 'Agregar categoría'}</button>
          <button className='btn btn-effect bg-cyan' onClick={onClear}>Limpiar</button>
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
                  <AlterRow onClickEdit={() => onClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default withForm(AdminCategorias)('categorias')

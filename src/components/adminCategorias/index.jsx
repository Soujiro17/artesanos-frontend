import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Spinner from '../spinner'
import AlterRow from '../alterRow'
import withForm from '../withForm'
import Checkbox from '../checkbox'
import FormInput from '../formInput'

const AdminCategorias = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form }) => {
  const { register, formState: { errors }, handleSubmit } = form

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['categorias'])

  return (
    <>
      <div className='form-container'>
        <h2>Crear categoria</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          <FormInput errors={errors} register={register} name='nombre' placeholder='Nombre categoría' />
          <FormInput errors={errors} register={register} name='foto' accept='image/*' type='file' />
          {idToUpdate && <Checkbox name='eliminarFoto' register={register} label='Eliminar foto' />}
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
                  <AlterRow path='categoria' id={item._id} onClickEdit={() => onClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
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

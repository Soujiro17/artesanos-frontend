/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Spinner from '../spinner'
import { SelectArtesanos } from '..'
import AlterRow from '../alterRow'
import { getProductosByEmprendimientoId } from '../../api/productos'
import withForm from '../withForm'
import Checkbox from '../checkbox'
import FormInput from '../formInput'

/*
AuxId almacena almacena el id del artesano seleccionado
de ver sus productos, para así hacer el refetch al actualizar
*/

const AdminProductos = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form, auxId, setAuxId, foto }) => {
  const { data, isLoadingData, refetch } = useQuery(['productos', auxId], () => getProductosByEmprendimientoId({ _id: auxId, pagination: false }), {
    enabled: false
  })

  const queryClient = useQueryClient()
  const categorias = queryClient.getQueryData(['categorias'])

  const { register, formState: { errors }, handleSubmit } = form

  const onChangeProductosByArtesanoId = (e) => setAuxId(e.target.value)

  useEffect(() => {
    if (auxId) {
      refetch()
    }
  }, [auxId])

  return (
    <>
      <div className='form-container'>
        <h2>Crear producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          <FormInput name='nombre' errors={errors} register={register} placeholder='Nombre producto' />
          <FormInput name='precio' errors={errors} register={register} placeholder='Precio producto' type='number' />
          <FormInput name='stock' errors={errors} register={register} placeholder='Stock' type='number' />
          <FormInput name='descripcion' errors={errors} register={register} placeholder='Este producto está hecho de...' isTextArea />
          <Checkbox name='visible' errors={errors} register={register} label='Visible' />
          <FormInput name='foto' foto={foto} errors={errors} register={register} type='file' accept='image/*' />
          <select className={`${errors.categoria ? 'error-campo' : ''} input`} {...register('categoria', { required: true })}>
            <option value=''>Seleccionar categoría</option>
            {
              categorias?.docs?.map(categoria => (
                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
              ))
            }
          </select>
          <SelectArtesanos returnEmprendimientoId form={form} />
          <button className='btn btn-effect bg-cyan' type='submit'>{idToUpdate ? 'Actualizar producto' : 'Agregar producto'}</button>
          <button className='btn btn-effect bg-cyan' onClick={onClear}>Limpiar</button>
        </form>
      </div>
      <div>
        <p>Selecciona un artesano para ver sus productos</p>
        <SelectArtesanos onChange={onChangeProductosByArtesanoId} returnEmprendimientoId isRequired />
        <div className='table-container'>
          <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Visible</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
              isLoadingData
                ? <Spinner />
                : data?.docs?.map(item =>
                  <tr key={item._id}>
                    <td>{item.nombre}</td>
                    <td>{item.precio}</td>
                    <td>{item.stock === null ? 'Consultar al artesano' : item.stock}</td>
                    <td>{item.visible ? 'Sí' : 'No'}</td>
                    <AlterRow onClickEdit={() => onClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default withForm(AdminProductos)('productos')

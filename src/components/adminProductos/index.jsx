/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Spinner from '../spinner'
import { SelectArtesanos } from '..'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import { getProductosByEmprendimientoId } from '../../api/productos'
import withForm from '../withForm'

const AdminProductos = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form }) => {
  const [selectedArtesano, setSelectedArtesano] = useState('')

  const { data, isLoadingData, refetch } = useQuery(['productos', selectedArtesano], () => getProductosByEmprendimientoId({ _id: selectedArtesano, pagination: false }), {
    enabled: false
  })

  const queryClient = useQueryClient()
  const categorias = queryClient.getQueryData(['categorias'])

  const mutatorConfig = useMutatorConfig('Categoria', () => {
    if (selectedArtesano === getValues('artesano')) {
      queryClient.prefetchQuery(['productos', selectedArtesano])
    }
  })

  const { register, formState: { errors }, handleSubmit, getValues } = form

  const onChangeProductosByArtesanoId = (e) => setSelectedArtesano(e.target.value)

  useEffect(() => {
    if (selectedArtesano) {
      refetch()
    }
  }, [selectedArtesano])

  return (
    <>
      <div className='form-container'>
        <p>Crear producto</p>
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          <input className={`${errors.nombre ? 'error-campo' : ''} input`} defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre producto' />
          <input className={`${errors.precio ? 'error-campo' : ''} input`} defaultValue='' {...register('precio', { required: true })} type='number' placeholder='Precio producto' />
          <input className='input' defaultValue='' {...register('stock')} type='number' placeholder='Stock producto' />
          <textarea className='input' defaultValue='' {...register('descripcion')} placeholder='Descripción producto' maxLength={300} />
          <div>
            <input id='visible' defaultChecked {...register('visible')} type='checkbox' />
            <label htmlFor='visible'>Visible</label>
          </div>
          <input defaultValue='' {...register('foto')} type='file' accept='image/*' />
          <select className={`${errors.categoria ? 'error-campo' : ''} input`} defaultValue='' {...register('categoria', { required: true })}>
            <option value=''>Seleccionar categoría</option>
            {
              categorias?.docs?.map(categoria => (
                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
              ))
            }
          </select>
          <SelectArtesanos form={form} />
          <button className='btn btn-effect bg-cyan' type='submit'>{idToUpdate ? 'Actualizar producto' : 'Agregar producto'}</button>
          <button className='btn btn-effect bg-cyan' onClick={onClear}>Limpiar</button>
        </form>
      </div>
      <div>
        <p>Selecciona un artesano para ver sus productos</p>
        <SelectArtesanos onChange={onChangeProductosByArtesanoId} returnEmprendimientoId />
        <div className='table-container'>
          <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Visible</th>
                <th>SKU</th>
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

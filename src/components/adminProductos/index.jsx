/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
import Spinner from '../spinner'
import { SelectArtesanos } from '..'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import { actualizarProducto, crearProducto, eliminarProducto, getProductosByEmprendimientoId } from '../../api/productos'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const AdminProductos = () => {
  const [selectedArtesano, setSelectedArtesano] = useState('')
  const [idToUpdate, setIdToUpdate] = useState('')

  const { data, isLoadingData, refetch } = useQuery(['productos', selectedArtesano], () => getProductosByEmprendimientoId({ _id: selectedArtesano, pagination: false }), {
    enabled: false
  })

  const axiosPrivate = useAxiosPrivate()

  const queryClient = useQueryClient()
  const categorias = queryClient.getQueryData('categorias')

  const mutatorConfig = useMutatorConfig('Categoria', () => {
    if (selectedArtesano === getValues('artesano')) {
      queryClient.prefetchQuery(['productos', selectedArtesano])
    }
  })

  const form = useForm()
  const { register, formState: { errors }, handleSubmit, setValue, getValues, reset } = form

  const onChangeProductosByArtesanoId = (e) => setSelectedArtesano(e.target.value)

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(crearProducto, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(actualizarProducto, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(eliminarProducto, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data?.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (idToUpdate) mutateActualizar({ values: formData, _id: idToUpdate, axios: axiosPrivate })
    else mutateCrear({ values: formData, axios: axiosPrivate })

    clearFields()
  }

  useEffect(() => {
    if (selectedArtesano) {
      refetch()
    }
  }, [selectedArtesano])

  const handleOnClickSet = ({ _id, nombre, precio, stock, descripcion, visible, categoria, artesano }) => {
    setValue('nombre', nombre)
    setValue('precio', precio)
    setValue('stock', stock)
    setValue('descripcion', descripcion)
    setValue('visible', visible)
    setValue('categoria', categoria)
    setValue('artesano', artesano)
    setIdToUpdate(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
    mutateEliminar({ _id, axios: axiosPrivate })
  }

  const clearFields = () => {
    reset()
    setIdToUpdate('')
  }

  return (
    <>
      <div className='form-container'>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
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
          <button className='btn btn-effect bg-cyan' onClick={clearFields}>Limpiar</button>
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
                    <AlterRow onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => remove(item._id)} />
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

export default AdminProductos

/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import X from '../icons/X'
import useMutatorConfig from '../../hooks/useMutatorConfig'

const AdminProductos = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [pymeId, setPymeId] = useState('')
  const [id, setId] = useState('')

  const api = useApi()

  const { data, isLoadingData, refetch } = useQuery(['productos', pymeId], () => api.getProductosByPymeId({ _id: pymeId, pagination: false }), {
    enabled: false
  })

  const mutatorConfig = useMutatorConfig('Categoria', () => {
    if (pymeId === getValues('pymeId')) {
      queryClient.prefetchQuery(['productos', pymeId])
    }
  })

  const { data: pymes, isLoading: isLoadingPymes } = useQuery('pymes', () => api.getPymes({ query: { pagination: false } }))

  const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm()

  const queryClient = useQueryClient()

  const categorias = queryClient.getQueryData('categorias')

  const onChangeProductosByPymeId = (e) => setPymeId(e.target.value)

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearProducto, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarProducto, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarProducto, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data?.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizar({ values: formData, _id: id })
    else mutateCrear({ values: formData })

    clearFields()
  }

  useEffect(() => {
    if (pymeId) {
      refetch()
    }
  }, [pymeId])

  const handleOnClickSet = ({ _id, nombre, precio, stock, sku, descripcion, visible, categoriaId, pymeId }) => {
    setValue('nombre', nombre)
    setValue('precio', precio)
    setValue('stock', stock)
    setValue('sku', sku)
    setValue('descripcion', descripcion)
    setValue('visible', visible)
    setValue('categoriaId', categoriaId)
    setValue('pymeId', pymeId)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombre', '')
    setValue('precio', '')
    setValue('foto', [])
    setValue('stock', '')
    setValue('sku', '')
    setValue('descripcion', '')
    setValue('visible', true)
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear producto</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre producto' />
          {errors.precio && <span>Precio es requerido</span>}
          <input defaultValue='' {...register('precio', { required: true })} type='number' placeholder='Precio producto' />
          <input defaultValue='' {...register('stock')} type='number' placeholder='Stock producto' />
          {errors.sku && <span>SKU es requerido</span>}
          <input defaultValue='' {...register('sku', { required: true })} placeholder='SKU producto' />
          {errors.descripcion && <span>Descripción es requerida</span>}
          <textarea defaultValue='' {...register('descripcion')} placeholder='Descripción producto' maxLength={300} />
          <div>
            <input id='visible' defaultChecked {...register('visible')} type='checkbox' />
            <label htmlFor='visible'>Visible</label>
          </div>
          <input defaultValue='' {...register('foto')} type='file' accept='image/*' />
          {errors.categoriaId && <span>Categoría es requerida</span>}
          <select defaultValue='' {...register('categoriaId', { required: true })}>
            <option value=''>Seleccionar categoría</option>
            {
              categorias?.docs?.map(categoria => (
                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
              ))
            }
          </select>
          {errors.pymeId && <span>Pyme es requerida</span>}
          {
            isLoadingPymes
              ? <Spinner />
              : (
              <select defaultValue='' {...register('pymeId', { required: true })}>
                <option value=''>Seleccionar pyme</option>
                {
                  pymes?.docs?.map(pyme => <option key={pyme._id} value={pyme._id}>{pyme.nombre} - {pyme.rut}</option>)
                }
              </select>)
          }
          <button type='submit'>{isUpdating ? 'Actualizar producto' : 'Agregar producto'}</button>
          {isUpdating && <button onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div>
        <p>Selecciona una pyme para ver sus productos</p>
        {
            isLoadingPymes
              ? <Spinner />
              : (
              <select onChange={onChangeProductosByPymeId} value={pymeId}>
                <option value=''>Seleccionar pyme</option>
                {
                  pymes?.docs?.map(pyme => <option key={pyme._id} value={pyme._id}>{pyme.nombre} - {pyme.rut}</option>)
                }
              </select>)
        }
        <div>
          <ul>
            {
              isLoadingData
                ? <Spinner />
                : data?.docs?.map(item =>
                  <li key={item._id}>
                    <p onClick={() => handleOnClickSet({ ...item })}>Nombre: {item.nombre}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>Precio: {item.precio}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>Stock: {item.stock === null ? 'Consultar al artesano' : item.stock}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>Visible: {item.visible ? 'Visible' : 'Oculto'}</p>
                    <p onClick={() => handleOnClickSet({ ...item })}>SKU: {item.sku}</p>
                    <X onClick={() => remove(item._id)} />
                  </li>
                )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminProductos

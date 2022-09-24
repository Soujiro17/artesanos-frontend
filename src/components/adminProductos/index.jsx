/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SelectArtesanos } from '..'
import { getProductosByEmprendimientoId } from '../../api/productos'
import withForm from '../withForm'
import Checkbox from '../checkbox'
import FormInput from '../formInput'
import AdminTable from '../adminTable'
import { productosHeaders } from '../../data/tableHeaders'

/*
AuxId almacena almacena el id del artesano seleccionado
de ver sus productos, para así hacer el refetch al actualizar
*/

const AdminProductos = React.memo(({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form, auxId, setAuxId, foto, onClearPicture }) => {
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
          <FormInput name='precio' errors={errors} register={register} placeholder='Precio producto' type='number' defaultValue={0} />
          <FormInput name='stock' errors={errors} register={register} placeholder='Stock' type='number' defaultValue={0} />
          <FormInput name='descripcion' errors={errors} register={register} placeholder='Descripción producto' isTextArea />
          <Checkbox name='visible' errors={errors} register={register} label='Visible' />
          <FormInput name='foto' foto={foto} errors={errors} register={register} type='file' accept='image/*' onClearPicture={onClearPicture} />
          <select className={`${errors.categoria ? 'error-campo' : ''} input`} {...register('categoria')}>
            <option value=''>Seleccionar categoría</option>
            {
              categorias?.docs?.map(categoria => (
                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
              ))
            }
          </select>
          <SelectArtesanos errors={errors} register={register} name='emprendimiento' returnEmprendimientoId />
          <button className='btn btn-effect bg-cyan' type='submit'>{idToUpdate ? 'Actualizar producto' : 'Agregar producto'}</button>
          <button className='btn btn-effect bg-cyan' onClick={onClear}>Limpiar</button>
        </form>
      </div>
      <div>
        <p>Selecciona un artesano para ver sus productos</p>
        <SelectArtesanos onChange={onChangeProductosByArtesanoId} returnEmprendimientoId />
        <AdminTable data={data} handleOnClickSet={onClickSet} isLoading={isLoadingData} onRemove={onRemove} path='producto' headers={productosHeaders} />
      </div>
    </>
  )
})

export default withForm(AdminProductos)('productos')

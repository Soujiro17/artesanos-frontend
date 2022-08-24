import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import { validate, format } from 'rut.js'

const AdminArtesanos = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Artesano', 'artesanos')

  const { register, formState: { errors }, handleSubmit, setValue, control } = useForm()

  const api = useApi()

  const crearPyme = useWatch({ control, name: 'crearPyme' })

  const { data, isLoading: isLoadingData } = useQuery('artesanos', () => api.getArtesanos({ query: { pagination: false } }))

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearArtesano, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarArtesano, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarArtesano, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizar({ values: formData, _id: id })
    else mutateCrear({ values: formData })

    clearFields()
  }

  const handleOnClickSet = ({ _id, nombres, apellidos, rut }) => {
    setValue('nombres', nombres)
    setValue('apellidos', apellidos)
    setValue('rut', rut)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombres', '')
    setValue('apellidos', '')
    setValue('rut', '')
    setValue('foto', [])
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear Artesano</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombres && <span>Nombres es requerido</span>}
          <input className='input' defaultValue='' {...register('nombres', { required: true })} placeholder='Nombres artesano' />
          {errors.apellidos && <span>Apellidos es requerido</span>}
          <input className='input' defaultValue='' {...register('apellidos', { required: true })} placeholder='Apellidos artesano' />
          {errors.rut && <span>RUT es requerido o es inválido</span>}
          <input className='input' defaultValue='' {...register('rut', { required: true, validate: (value) => validate(value), setValueAs: (value) => format(value) })} placeholder='ej: 111111111' />
          {crearPyme && <input className='input' defaultValue='' {...register('direccion', { required: !!crearPyme })} placeholder='ej: Gral Cruz 222' />}
          <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          {crearPyme && errors.direccion && <span>Dirección es requerido</span>}
          <div>
            <label htmlFor='crear-pyme'>Crear pyme con datos del artesano</label>
            <input id='crear-pyme' type='checkbox' {...register('crearPyme')} />
          </div>
          <button className='btn btn-effect bg-cyan' type='submit'>{isUpdating ? 'Actualizar artesano' : 'Agregar artesano'}</button>

          {isUpdating && <button className='btn btn-effect bg-cyan' onClick={clearFields}>Limpiar</button>}
        </form>
      </div>
      <div className='table-container'>
        <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
        <table>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>RUT</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {
            !data || isLoadingData
              ? <tr><td colSpan={4}><Spinner /></td></tr>
              : data?.docs?.map(item =>
                <tr key={item._id}>
                  <td>{item.nombres}</td>
                  <td>{item.apellidos}</td>
                  <td>{item.rut}</td>
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

export default AdminArtesanos

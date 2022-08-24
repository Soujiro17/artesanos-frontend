/* eslint-disable react/jsx-indent */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import { validate, format } from 'rut.js'

const AdminPymes = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [redes, setRedes] = useState({})
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Pyme', 'pymes')

  const { register, formState: { errors }, handleSubmit, setValue } = useForm()

  const handleRedes = (e, i, redSocial) => {
    if (!redes[e.target.name]) {
      setValue(`redes_sociales.${i}.red_social`, redSocial)
    } else {
      setValue(`redes_sociales.${i}`, null)
    }
    setRedes(prev => ({ ...prev, [e.target.name]: !prev[e.target.name] }))
  }

  const api = useApi()

  const { data, isLoading: isLoadingData } = useQuery('pymes', () => api.getPymes({ query: { pagination: false } }))
  const { data: artesanos, isLoading: isLoadingArtesanos } = useQuery('artesanos', () => api.getArtesanos({ query: { pagination: false } }))

  const queryClient = useQueryClient()

  const rubros = queryClient.getQueryData('rubros')
  const redesSociales = queryClient.getQueryData('redes_sociales')

  const { mutate: mutateCrear, isLoading: isLoadingCreate } = useMutation(api.crearPyme, mutatorConfig.create)
  const { mutate: mutateActualizar, isLoading: isLoadingUpdate } = useMutation(api.actualizarPyme, mutatorConfig.update)
  const { mutate: mutateEliminar, isLoading: isLoadingDelete } = useMutation(api.eliminarPyme, mutatorConfig.delete)

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (id) mutateActualizar({ values: formData, _id: id })
    else mutateCrear({ values: formData })

    clearFields()
  }

  const handleOnClickSet = ({ _id, nombre, rut, duenoId, rubro, direccion, horarios, telefono, correo, redes_sociales: redesSocialess }) => {
    setValue('nombre', nombre)
    setValue('rut', rut)
    setValue('duenoId', duenoId)
    setValue('rubro', rubro)
    setValue('direccion', direccion.nombre)
    setValue('horarios', horarios)
    setValue('telefono', telefono)
    setValue('correo', correo)
    setValue('redes_sociales', redesSocialess)
    setIsUpdating(true)
    setId(_id)
  }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return
    mutateEliminar({ _id })
  }

  const clearFields = () => {
    setValue('nombre', '')
    setValue('rut', '')
    setValue('foto', [])
    setValue('duenoId', '')
    setValue('rubro', '')
    setValue('direccion', '')
    setValue('horarios', '')
    setValue('telefono', '')
    setValue('correo', '')
    setValue('redes_sociales', [])
    setRedes({})
    setIsUpdating(false)
    setId('')
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear Pyme</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {errors.nombre && <span>Nombre es requerido</span>}
          <input className='input' defaultValue='' {...register('nombre', { required: true })} placeholder='Nombre pyme' />
          {/* {errors.rut && <span>RUT es requerido o es inválido</span>} */}
          <input
            className='input' defaultValue='' {...register('rut'
              // {
              // required: true,
              // validate: (value) => validate(value),
              // setValueAs: (value) => format(value)
              // }
            )}
            placeholder='RUT pyme'
          />
          <input defaultValue='' {...register('foto')} type='file' accept='image/*' />
          <select className='input' defaultValue='' {...register('rubro')}>
            <option value=''>Seleccionar rubro</option>
            {
              rubros?.map(rubro => (
                <option key={rubro._id} value={rubro._id}>{rubro.nombre}</option>
              ))
            }
          </select>
          {
            isLoadingArtesanos
              ? <Spinner />
              : (
              <select className='input' defaultValue='' {...register('duenoId', { required: true })}>
                <option value=''>Seleccionar artesano</option>
                {
                  artesanos?.docs?.map(artesano => <option key={artesano._id} value={artesano._id}>{artesano.nombres} {artesano.apellidos} - {artesano.rut}</option>)
                }
              </select>)
          }
          {errors.direccion && <span>Direccion es requerida</span>}
          <input className='input' defaultValue='' {...register('direccion', { required: true })} placeholder='Direccion. Ejemplo: Gral Cruz 222, Valparaíso' />
          <input className='input' defaultValue='' {...register('horarios')} placeholder='Horarios. Ejemplo: 12:00 a 18:00 pm lunes a viernes' />
          <input className='input' defaultValue='' {...register('telefono', { valueAsNumber: true })} placeholder='Teléfono. Ejemplo: 911223344' type='number' />
          <input className='input' defaultValue='' {...register('correo')} placeholder='Email pyme' type='email' />
          <textarea className='input' defaultValue='' {...register('descripcion')} placeholder='Descripción pyme' maxLength={300} />

          <div>
            {
              redesSociales?.map((redSocial, i) => {
                return (
                  <div key={redSocial._id}>
                    <input id={redSocial.nombre} type='checkbox' checked={redes[redSocial.nombre] || false} onChange={(e) => handleRedes(e, i, redSocial._id)} name={redSocial.nombre} value={redes[redSocial._id] || false} />
                    <label htmlFor={redSocial.nombre}>{redSocial.nombre}</label>
                    {
                      redes[redSocial.nombre] &&
                          <input defaultValue='' {...register(`redes_sociales.${i}.url`)} placeholder={`${redSocial.nombre} link`} />
                    }
                  </div>
                )
              })
            }
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
              <th>Nombre</th>
              <th>Rut</th>
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

export default AdminPymes

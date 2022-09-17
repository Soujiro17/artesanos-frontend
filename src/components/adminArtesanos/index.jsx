import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toFormData } from '../../utilities/toFormData'
import useApi from '../../hooks/useApi'
import Spinner from '../spinner'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import AlterRow from '../alterRow'
import styles from './styles.module.scss'

const AdminArtesanos = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState('')

  const mutatorConfig = useMutatorConfig('Artesano', 'artesanos')

  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm()

  const api = useApi()

  const { data, isLoading: isLoadingData } = useQuery('artesanos', () => api.getArtesanos({ query: { pagination: false, populate: true } }))

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

  const handleOnClickSet = ({ _id, nombres, apellidos, rut, emprendimiento }) => {
    setValue('nombres', nombres)
    setValue('apellidos', apellidos)
    setValue('rut', rut)
    setValue('nombre', emprendimiento?.nombre)
    setValue('descripcion', emprendimiento?.descripcion)
    setValue('direccion', emprendimiento?.direccion?.nombre)
    setValue('telefono', emprendimiento?.telefono)
    setIsUpdating(true)
    setId(_id)
  }

  // // const crearArtesanos = () => {
  // //   artesanos.map(artesano => mutateCrear({ values: toFormData(artesano) }))
  // // }

  const remove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return

    if (_id === id) {
      setIsUpdating(false)
      setId('')
    }

    mutateEliminar({ _id })
  }

  const clearFields = () => {
    reset()
  }

  return (
    <>
      <div>
        {(isLoadingCreate || isLoadingUpdate || isLoadingDelete) && <Spinner fullScreen />}
        <p>Crear Artesano</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.admin_form_sides}>
          <div className={styles.side}>
            <input className={`${errors.nombres ? 'error-campo' : ''} input`} defaultValue='' {...register('nombres', { required: true })} placeholder='Nombres artesano' />
            <input className={`${errors.apellidos ? 'error-campo' : ''} input`} defaultValue='' {...register('apellidos', { required: true })} placeholder='Apellidos artesano' />
            <input className='input' defaultValue='' {...register('rut')} placeholder='ej: 111111111' />
            <input defaultValue={null} {...register('foto')} type='file' accept='image/*' />
          </div>

          <div className={styles.side}>
            <input className='input' defaultValue='' {...register('nombre')} placeholder='Nombre emprendimiento' />
            <input className='input' defaultValue='' {...register('descripcion')} placeholder='Descripcion emprendimiento' />
            <input className='input' defaultValue='' {...register('direccion')} placeholder='Direccion' />
            <input className='input' defaultValue='' {...register('telefono')} placeholder='Teléfono' />
            <input className='input' defaultValue='' {...register('correo')} placeholder='Correo' />
          </div>

          <div className={styles.botones}>
            <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} type='submit'>{isUpdating ? 'Actualizar artesano' : 'Agregar artesano'}</button>
            <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} onClick={clearFields}>Limpiar</button>
          </div>
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
        {/* <button onClick={crearArtesanos}>Agregar artesanos</button> */}
      </div>
    </>
  )
}

export default AdminArtesanos

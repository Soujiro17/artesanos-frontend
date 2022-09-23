import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../spinner'
import AlterRow from '../alterRow'
import styles from './styles.module.scss'
import { getArtesanos } from '../../api/artesanos'
import withForm from '../withForm'
import FormInput from '../formInput'

const AdminArtesanos = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form }) => {
  const { register, formState: { errors }, handleSubmit } = form

  const { data, isLoading: isLoadingData } = useQuery(['artesanos'], () => getArtesanos({ query: { pagination: false, populate: true } }))

  const handleOnClickSet = ({ _id, nombres, apellidos, rut, emprendimiento }) => {
    const parsedValues = {
      _id,
      nombre: emprendimiento?.nombre || `${nombres} ${apellidos}`,
      descripcion: emprendimiento?.descripcion,
      direccion: emprendimiento?.direccion?.nombre,
      telefono: emprendimiento?.telefono,
      redesSociales: emprendimiento?.redes_sociales,
      nombres,
      apellidos,
      rut
    }

    onClickSet(parsedValues)
  }

  return (
    <>
      <div>
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
            <FormInput errors={errors} register={register} name='descripcion' placeholder='... es una artesana que ha sido capaz...' isTextArea />
            <input className='input' defaultValue='' {...register('direccion')} placeholder='Direccion' />
            <input className='input' defaultValue='' {...register('telefono')} placeholder='Teléfono' />
            <input className='input' defaultValue='' {...register('correo')} placeholder='Correo' />
          </div>

          <div className={styles.botones}>
            <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} type='submit'>{idToUpdate ? 'Actualizar artesano' : 'Agregar artesano'}</button>
            <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} onClick={onClear}>Limpiar</button>
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
              <th>Nombre emprendimiento</th>
              <th>Dirección</th>
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
                  <td>{item.emprendimiento?.nombre || '-'}</td>
                  <td>{item.emprendimiento?.direccion?.nombre || '-'}</td>
                  <td>{item.rut || '-'}</td>
                  <AlterRow path='artesano' id={item._id} onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
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

export default withForm(AdminArtesanos)('artesanos')

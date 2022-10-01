import { useQuery } from '@tanstack/react-query'
import styles from './styles.module.scss'
import { getArtesanos } from '../../api/artesanos'
import withForm from '../withForm'
import FormInput from '../formInput'
import AdminTable from '../adminTable'
import { artesanosHeaders } from '../../data/tableHeaders'
import TextEditor from '../textEditor'

const AdminArtesanos = ({ onSubmit, onRemove, onClickSet, onClear, idToUpdate, form, foto, onClearPicture }) => {
  const { register, formState: { errors }, handleSubmit, setValue, getValues } = form

  const { data, isLoading: isLoadingData } = useQuery(['artesanos'], () => getArtesanos({ query: { pagination: false, populate: true } }))

  const handleOnClickSet = ({ _id, nombres, apellidos, rut, emprendimiento, foto }) => {
    const parsedValues = {
      _id,
      nombre: emprendimiento?.nombre || `${nombres} ${apellidos}`,
      descripcion: JSON.parse(emprendimiento?.descripcion),
      direccion: emprendimiento?.direccion?.nombre,
      telefono: emprendimiento?.telefono,
      redesSociales: emprendimiento?.redes_sociales,
      nombres,
      apellidos,
      rut,
      foto
    }

    onClickSet(parsedValues)
  }

  return (
    <>
      <h2 className='text-align-center'>Crear Artesano</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.admin_form_sides}>
        <div className={styles.side}>
          <FormInput name='nombres' errors={errors} register={register} placeholder='Nombres artesano' />
          <FormInput name='apellidos' errors={errors} register={register} placeholder='Apellidos artesano' />
          <FormInput name='rut' errors={errors} register={register} placeholder='Rut' />
          <FormInput name='foto' errors={errors} register={register} foto={foto} type='file' accept='image/*' onClearPicture={onClearPicture} artesano />
        </div>

        <div className={styles.side}>
          <FormInput name='nombre' errors={errors} register={register} placeholder='Nombre emprendimiento' />
          <TextEditor name='descripcion' setValue={setValue} value={getValues('descripcion')} />
          {/* <FormInput errors={errors} register={register} name='descripcion' placeholder='Descripción' isTextArea /> */}
          <FormInput name='direccion' errors={errors} register={register} placeholder='Dirección' />
          <FormInput name='telefono' errors={errors} register={register} placeholder='Teléfono' />
          <FormInput name='correo' errors={errors} register={register} placeholder='Correo' />
        </div>

        <div className={styles.botones}>
          <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} type='submit'>{idToUpdate ? 'Actualizar artesano' : 'Agregar artesano'}</button>
          <button className={`${styles.btn_submit} btn btn-effect bg-cyan`} onClick={onClear}>Limpiar</button>
        </div>
      </form>
      <AdminTable data={data} isLoading={isLoadingData} path='artesano' handleOnClickSet={handleOnClickSet} onRemove={onRemove} headers={artesanosHeaders} />
    </>
  )
}

export default withForm(AdminArtesanos)('artesanos')

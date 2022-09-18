import { useQuery } from 'react-query'
import { getArtesanos } from '../../api/artesanos'
import Spinner from '../spinner'

const SelectArtesanos = ({ form, isRequired = true, populate = true, paginate = false, query, onChange, returnEmprendimientoId = false }) => {
  const { data: artesanos, isLoading: isLoadingArtesanos } = useQuery(['artesanos'], () => getArtesanos({ query: { ...query, pagination: paginate, populate } }))

  if (isLoadingArtesanos) return <Spinner />

  const content = (
    <>
      <option value=''>Seleccionar artesano</option>
      {artesanos?.docs?.map(artesano => <option key={artesano._id} value={returnEmprendimientoId ? artesano.emprendimiento : artesano._id}>{artesano.emprendimiento?.nombre || `${artesano.nombres} ${artesano.apellidos}`}</option>)}
    </>
  )

  if (onChange && !form) return <select className='input' onChange={onChange}>{content}</select>

  const { formState: { errors }, register } = form
  const className = `${errors?.nombre ? 'error-campo' : ''} input`

  return <select className={className} defaultValue='' {...register('artesano', { required: isRequired })}>{content}</select>
}

export default SelectArtesanos

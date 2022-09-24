import { useQuery } from '@tanstack/react-query'
import { getArtesanos } from '../../api/artesanos'
import Spinner from '../spinner'

const SelectArtesanos = ({ register, errors, name, populate = true, paginate = false, query, onChange, returnEmprendimientoId = false }) => {
  const { data: artesanos, isLoading: isLoadingArtesanos } = useQuery(['artesanos'], () => getArtesanos({ query: { ...query, pagination: paginate, populate } }))

  if (isLoadingArtesanos) return <Spinner />

  const content = (
    <>
      <option value=''>Seleccionar artesano</option>
      {artesanos?.docs?.map(artesano => <option key={artesano._id} value={returnEmprendimientoId ? artesano.emprendimiento?._id : artesano._id}>{artesano.emprendimiento?.nombre} - {artesano.nombres} {artesano.apellidos}</option>)}
    </>
  )

  if (onChange && !register) return <select onChange={onChange} className='input'>{content}</select>

  const className = errors ? `${errors[name] ? 'error-campo' : ''} input` : 'input'

  return <select className={className} {...register(returnEmprendimientoId ? 'emprendimiento' : 'artesano')}>{content}</select>
}

export default SelectArtesanos

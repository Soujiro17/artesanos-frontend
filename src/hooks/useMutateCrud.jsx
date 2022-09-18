import { useMutation } from '@tanstack/react-query'
import Spinner from '../components/spinner'
import useAxiosPrivate from './useAxiosPrivate'

const useMutateCrud = (createFunction, updateFunction, deleteFunction, config) => {
  const axiosPrivate = useAxiosPrivate()

  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(data => createFunction({ ...data, axios: axiosPrivate }), config.create)
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(data => updateFunction({ ...data, axios: axiosPrivate }), config.update)
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(data => deleteFunction({ ...data, axios: axiosPrivate }), config.delete)

  if (isLoadingCreate || isLoadingUpdate || isLoadingDelete) return <Spinner fullScreen />

  return { mutateCreate, mutateUpdate, mutateDelete }
}

export default useMutateCrud

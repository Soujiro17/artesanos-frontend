import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from './useAxiosPrivate'

const useMutateCrud = (createFunction, updateFunction, deleteFunction, config) => {
  const axiosPrivate = useAxiosPrivate()

  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(data => createFunction({ ...data, axios: axiosPrivate }), config.create)
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(data => updateFunction({ ...data, axios: axiosPrivate }), config.update)
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(data => deleteFunction({ ...data, axios: axiosPrivate }), config.delete)

  return { mutateCreate, mutateUpdate, mutateDelete, isLoadingCreate, isLoadingUpdate, isLoadingDelete }
}

export default useMutateCrud

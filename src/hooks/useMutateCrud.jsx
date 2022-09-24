import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from './useAxiosPrivate'

const useMutateCrud = (createFunction, updateFunction, deleteFunction, config) => {
  const axiosPrivate = useAxiosPrivate()

  const { mutate: mutateCreate, isLoading: isLoadingCreate, isSuccess: isSuccessCreate } = useMutation(data => createFunction({ ...data, axios: axiosPrivate }), config.create)
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate } = useMutation(data => updateFunction({ ...data, axios: axiosPrivate }), config.update)
  const { mutate: mutateDelete, isLoading: isLoadingDelete, isSuccess: isSuccessDelete } = useMutation(data => deleteFunction({ ...data, axios: axiosPrivate }), config.delete)

  return {
    mutateCreate,
    mutateUpdate,
    mutateDelete,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDelete,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessDelete
  }
}

export default useMutateCrud

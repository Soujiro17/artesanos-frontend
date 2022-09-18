import { useMutation } from 'react-query'
import useAxiosPrivate from './useAxiosPrivate'
import useMutatorConfig from './useMutatorConfig'

const useMutateCrud = (createFunction, updateFunction, deleteFunction, config) => {
  const axiosPrivate = useAxiosPrivate()

  let newConfig

  if (typeof config === 'string') {
    newConfig = useMutatorConfig(config, config + 's')
  }

  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(data => createFunction({ ...data, axios: axiosPrivate }), newConfig?.create || config.create)
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(data => updateFunction({ ...data, axios: axiosPrivate }), newConfig?.update || config.update)
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(data => deleteFunction({ ...data, axios: axiosPrivate }), newConfig?.delete || config.delete)

  return { mutateCreate, isLoadingCreate, mutateUpdate, isLoadingUpdate, mutateDelete, isLoadingDelete }
}

export default useMutateCrud

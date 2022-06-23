import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const useMutatorConfig = (title, fetchName) => {
  const queryClient = useQueryClient()

  const mutatorConfig = {
    create: {
      onSuccess: () => {
        toast.success(`${title} creada con éxito`)
        queryClient.prefetchQuery(fetchName)
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    update: {
      onSuccess: () => {
        toast.success(`${title} actualizada con éxito`)
        queryClient.prefetchQuery(fetchName)
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    delete: {
      onSuccess: () => {
        toast.success(`${title} eliminada con éxito`)
        queryClient.prefetchQuery(fetchName)
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    }
  }

  return mutatorConfig
}

export default useMutatorConfig

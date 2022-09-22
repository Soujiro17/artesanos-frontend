import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useMutatorConfig = (title, fetchName, fetchFunction) => {
  const queryClient = useQueryClient()

  const handleFunction = async () => {
    await queryClient.prefetchQuery(fetchName, fetchFunction)
  }

  const mutatorConfig = {
    create: {
      onSuccess: async () => {
        toast.success(`${title} creada con éxito`)
        await handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    update: {
      onSuccess: async () => {
        toast.success(`${title} actualizada con éxito`)
        await handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    delete: {
      onSuccess: async () => {
        toast.success(`${title} eliminada con éxito`)
        await handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    }
  }

  return mutatorConfig
}

export default useMutatorConfig

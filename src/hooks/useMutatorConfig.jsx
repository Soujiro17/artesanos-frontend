import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useMutatorConfig = (title, fetchName, fetchFunction) => {
  const queryClient = useQueryClient()

  const handleFunction = async () => {
    await queryClient.prefetchQuery([fetchName], fetchFunction)
  }

  const mutatorConfig = {
    create: {
      onSuccess: () => {
        toast.success(`${title} creada con éxito`)
        handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    update: {
      onSuccess: () => {
        toast.success(`${title} actualizada con éxito`)
        handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    },
    delete: {
      onSuccess: () => {
        toast.success(`${title} eliminada con éxito`)
        handleFunction()
      },
      onError: (res) => {
        toast.error(res.response.data)
      }
    }
  }

  return mutatorConfig
}

export default useMutatorConfig

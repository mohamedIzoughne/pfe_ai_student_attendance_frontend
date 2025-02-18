import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/api/apiClient'

export const useCreateSchool = () => {
    return useMutation({
      mutationFn: async (schoolData) => {
        const { data } = await apiClient.post('/curriculum/create-school', schoolData)
        return data
      },
    })
  }
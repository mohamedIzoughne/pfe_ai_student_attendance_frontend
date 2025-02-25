import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/api/apiClient'



export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const formData = new FormData()

      // Add all user data to formData
      Object.keys(userData).forEach((key) => {
        if (key === 'image' && userData[key]) {
          formData.append('image', userData[key])
        } else if (userData[key] !== undefined) {
          formData.append(key, userData[key])
        }
      })

      const { data } = await apiClient.post(
        '/curriculum/create-user',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return data
    },
  })
}

export const useGetDashboardData = (schoolId) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get(`/dashboard?school_id=${schoolId}`)
      return data
    },
  })
}

export const useGetGenderData = (schoolId) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get(`/gender-data?school_id=${schoolId}`)
      return data
    },
  })
}


import { useMutation, useQuery } from '@tanstack/react-query'
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

export const useGetAdminDashboardData = (schoolId) => {
  return useQuery({
    queryKey: ['adminDashboardStats', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/dashboard?school_id=${schoolId}`
      )
      return data
    },
  })
}

export const useGetTeacherDashboardData = (teacherId) => {
  return useQuery({
    queryKey: ['teacherDashboardStats', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/teacher/${teacherId}/dashboard`
      )
      return data
    },
    enabled: Boolean(teacherId),
  })
}

export const useGetGenderData = (schoolId, courseId) => {
  return useQuery({
    queryKey: ['studentsGenderTotal', schoolId, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/gender-data?schoolId=${schoolId}${
          courseId ? `&courseId=${courseId}` : ''
        }`
      )
      return data
    },
    enabled: Boolean(schoolId),
  })
}

export const useGetTeacherGenderData = (teacherId, courseId) => {
  return useQuery({
    queryKey: ['teacherStudentsGender', teacherId, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/teacher/${teacherId}/students-gender${
          courseId ? `?course_id=${courseId}` : ''
        }`
      )
      return data
    },
    enabled: Boolean(teacherId),
  })
}

// export const useGetGenderData = (schoolId) => {
//   return useMutation({
//     mutationFn: async () => {
//       const { data } = await apiClient.get(`/gender-data?school_id=${schoolId}`)
//       return data
//     },
//   })
// }

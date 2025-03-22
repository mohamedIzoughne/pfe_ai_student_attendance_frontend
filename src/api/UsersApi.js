import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/apiClient'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const formData = new FormData()

      // Add all user data to formData
      Object.keys(userData).forEach((key) => {
        // formData.append(key, userData[key])
        if (
          (key === 'imageProfile' || key === 'croppedImage') &&
          userData[key]
        ) {
          formData.append(key, userData[key])
        } else if (userData[key] !== undefined) {
          formData.append(key, userData[key])
        }
      })

      const { data } = await apiClient.post('/user/create-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

export const useGetTeacherSubjects = (teacherId) => {
  return useQuery({
    queryKey: ['teacherSubjects', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/teacher/${teacherId}/subjects`
      )
      return data
    },
    enabled: Boolean(teacherId),
  })
}

export const useGetTeacherSubjectsByCourse = (teacherId, courseId) => {
  return useQuery({
    queryKey: ['teacherSubjects', teacherId, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/teacher/${teacherId}/subjects/${courseId}`
      )
      return data
    },
    enabled: Boolean(teacherId) && Boolean(courseId),
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

export const useGetStudentDetails = (studentId) => {
  return useQuery({
    queryKey: ['studentDetails', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/user/students/${studentId}`)
      return data
    },
    enabled: Boolean(studentId),
  })
}

export const useGetStudentMarks = (studentId, semester) => {
  return useQuery({
    queryKey: ['studentMarks', studentId, semester],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/students/${studentId}/marks${
          semester ? `?semester=${semester}` : ''
        }`
      )
      return data
    },
    enabled: Boolean(studentId),
  })
}

export const useSearchStudents = (nameQuery, courseId) => {
  return useQuery({
    queryKey: ['searchStudents', nameQuery, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/students/search?name=${nameQuery}${
          courseId ? `&courseId=${courseId}` : ''
        }`
      )
      return data
    },
    // enabled: Boolean(nameQuery),
  })
}

export const useGetStudentComplaints = (studentId) => {
  return useQuery({
    queryKey: ['studentComplaints', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/students/${studentId}/complaints`
      )
      return data
    },
    enabled: Boolean(studentId),
  })
}

export const useSearchTeachers = (nameQuery, schoolId) => {
  return useQuery({
    queryKey: ['searchTeachers', nameQuery],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/user/teachers/search?name=${nameQuery}&schoolId=${schoolId}`
      )
      return data
    },
  })
}

export const useGetTeacherDetails = (teacherId) => {
  return useQuery({
    queryKey: ['teacherDetails', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/user/teachers/${teacherId}`)
      return data
    },
    enabled: Boolean(teacherId),
  })
}

export const useEditStudent = (studentId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.put(`/user/students/${studentId}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentDetails'])
    },
    enabled: Boolean(studentId),
  })
}

export const useEditTeacher = (teacherId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.put(`/user/teachers/${teacherId}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teacherDetails'])
    },
    enabled: Boolean(teacherId),
  })
}

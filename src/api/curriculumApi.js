import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/apiClient'

export const useCreateSchool = () => {
  return useMutation({
    mutationFn: async (schoolData) => {
      console.log('from api:', schoolData)
      const { data } = await apiClient.post(
        '/curriculum/create-school',
        schoolData
      )
      return data
    },
  })
}

export const useGetCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data } = await apiClient.get('/curriculum/cities')
      return data.cities
    },
  })
}

export const getSchools = async (city) => {
  const { data } = await apiClient.get(`/curriculum/schools?city=${city}`)
  return data.schools
}

export const useGetCourses = (schoolId) => {
  return useQuery({
    queryKey: ['courses', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/courses?schoolId=${schoolId}`
      )
      return data.courses
    },
    enabled: !!schoolId,
  })
}

export const useGetCoursesDetails = (schoolId) => {
  return useQuery({
    queryKey: ['courses-details', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/courses-details?schoolId=${schoolId}`
      )
      return data.courses
    },
    enabled: !!schoolId,
  })
}

export const useGetTeachers = (schoolId) => {
  return useQuery({
    queryKey: ['teachers', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/teachers?schoolId=${schoolId}`
      )
      return data.teachers
    },
    enabled: !!schoolId,
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ courseId, courseData }) => {
      const { data } = await apiClient.put(
        `/curriculum/courses/${courseId}`,
        courseData
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['courses'])
      queryClient.invalidateQueries(['courses-details'])
    },
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (courseId) => {
      const { data } = await apiClient.delete(`/curriculum/courses/${courseId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['courses'])
      queryClient.invalidateQueries(['courses-details'])
    },
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (courseData) => {
      const { data } = await apiClient.post('/curriculum/courses', courseData)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['courses'])
      queryClient.invalidateQueries(['courses-details'])
    },
  })
}

export const useGetSessions = (courseId) => {
  return useQuery({
    queryKey: ['sessions', courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/sessions?courseId=${courseId}`
      )
      return data.sessions
    },
    enabled: !!courseId,
  })
}

export const useGetExams = (teacherId, subjectId, examDate, courseId) => {
  return useQuery({
    queryKey: ['exams', teacherId, subjectId, examDate, courseId], // Unique query key
    queryFn: async () => {
      // Build the URL with optional query params
      let url = `/curriculum/exams/${teacherId}`
      const params = new URLSearchParams()

      if (subjectId) params.append('subjectId', subjectId)
      if (examDate) params.append('examDate', examDate.toISOString())
      if (courseId) params.append('courseId', courseId)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const { data } = await apiClient.get(url)
      return data
    },
    enabled: !!teacherId, // Only fetch if teacherId exists
  })
}

export const useRemoveExam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (examId) => {
      const { data } = await apiClient.delete(`/curriculum/exams/${examId}`)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['exams'])
    },
  })
}

export const useUpdateExam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ examId, examData }) => {
      const { data } = await apiClient.put(
        `/curriculum/exams/${examId}`,
        examData
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['exams'])
    },
  })
}

export const useCreateExam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ teacherId, examData }) => {
      const { data } = await apiClient.post(
        `/curriculum/exams/${teacherId}`,
        examData
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['exams'])
    },
  })
}


export const useGetRooms = (schoolId) => {
  return useQuery({
    queryKey: ['rooms', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/curriculum/rooms/${schoolId}`)
      return data.rooms
    },
    enabled: !!schoolId,
  })
}

export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (roomData) => {
      const { data } = await apiClient.post('/curriculum/rooms', roomData)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['rooms', variables.schoolId])
    },
  })
}

export const useRemoveRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roomId) => {
      const { data } = await apiClient.delete(`/curriculum/rooms/${roomId}`)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['rooms'])
    },
  })
}
export const useAddField = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fieldData) => {
      const { data } = await apiClient.post('/curriculum/fields', fieldData)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['fields'])
    },
  })
}

export const useGetFields = (schoolId) => {
  return useQuery({
    queryKey: ['fields', schoolId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/curriculum/fields/${schoolId}`)
      return data
    },
    enabled: !!schoolId, // Only run when schoolId is available
  })
}

export const useRemoveField = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fieldId) => {
      const { data } = await apiClient.delete(`/curriculum/fields/${fieldId}`)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['fields'])
    },
  })
}

export const useGetTeacherCourses = (teacherId) => {
  return useQuery({
    queryKey: ['teacherCourses', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/teachers/${teacherId}/courses`
      )
      return data.courses
    },
    enabled: !!teacherId, // Only run when teacherId is available
  })
}

export const useGetStudentQuizStats = (studentId) => {
  return useQuery({
    queryKey: ['studentQuizStats', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/students/${studentId}/quiz-stats`
      )
      return data
    },
    enabled: !!studentId, // Only run when studentId is available
  })
}

export const useRemoveQuiz = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (quizId) => {
      const { data } = await apiClient.delete(`/curriculum/quiz/${quizId}`)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['quizzes'])
    },
  })
}

// export const useRemoveExam = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (examId) => {
//       const { data } = await apiClient.delete(`/curriculum/exam/${examId}`)
//       return data
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries(['exams'])
//     },
//   })
// }

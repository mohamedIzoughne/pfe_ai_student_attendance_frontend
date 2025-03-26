import { toast } from 'sonner'
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
    onSuccess: () => {
      toast.success('School created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create school')
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

export const useGetCourses = (id, role) => {
  return useQuery({
    queryKey: ['courses', id, role],
    queryFn: async () => {
      const { data } = await apiClient.get(
        role === 'admin'
          ? `/curriculum/courses?schoolId=${id}`
          : `/curriculum/teachers/${id}/courses`
      )
      return data.courses
    },
    enabled: !!id,
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
    enabled: !!teacherId,
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
    onSuccess: () => {
      queryClient.invalidateQueries(['courses'])
      queryClient.invalidateQueries(['courses-details'])
      toast.success('Course updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update course')
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
      toast.success('Course deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete course')
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
    onSuccess: () => {
      queryClient.invalidateQueries(['courses'])
      queryClient.invalidateQueries(['courses-details'])
      toast.success('Course created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create course')
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
    queryKey: ['exams', teacherId, subjectId, examDate, courseId],
    queryFn: async () => {
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
    enabled: !!teacherId,
  })
}

export const useRemoveExam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (examId) => {
      const { data } = await apiClient.delete(`/curriculum/exams/${examId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['exams'])
      toast.success('Exam removed successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove exam')
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
      toast.success('Exam updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update exam')
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
      toast.success('Exam created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create exam')
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
      toast.success('Room created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create room')
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
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms'])
      toast.success('Room removed successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove room')
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
    onSuccess: () => {
      queryClient.invalidateQueries(['fields'])
      toast.success('Field added successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add field')
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
    enabled: !!schoolId,
  })
}

export const useRemoveField = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fieldId) => {
      const { data } = await apiClient.delete(`/curriculum/fields/${fieldId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['fields'])
      toast.success('Field removed successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove field')
    },
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
    enabled: !!studentId,
  })
}

export const useRemoveQuiz = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (quizId) => {
      const { data } = await apiClient.delete(`/curriculum/quiz/${quizId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes'])
      toast.success('Quiz removed successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove quiz')
    },
  })
}

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ subjectId, name }) => {
      const { data } = await apiClient.put(
        `/curriculum/subjects/${subjectId}`,
        {
          name,
        }
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects'])
      toast.success('Subject updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update subject')
    },
  })
}

export const useRemoveSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (subjectId) => {
      const { data } = await apiClient.delete(
        `/curriculum/subjects/${subjectId}`
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects'])
      toast.success('Subject removed successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove subject')
    },
  })
}

export const useCreateQuiz = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ name, dueDate, subjectId, teacherId, questions }) => {
      const { data } = await apiClient.post('/curriculum/quiz', {
        name,
        dueDate,
        subjectId,
        teacherId,
        questions: questions.map((question) => ({
          text: question.text,
          answers: question.answers,
        })),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes'])
      toast.success('Quiz created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create quiz')
    },
  })
}

export const useGetExamMarks = (examId) => {
  return useQuery({
    queryKey: ['examMarks', examId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/exams/exam-marks/${examId}`
      )
      return data
    },
  })
}

export const useAddMark = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ examId, studentId, mark, notes }) => {
      const { data } = await apiClient.post(
        `/curriculum/exams/${examId}/marks`,
        {
          studentId,
          mark,
          notes,
        }
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['examMarks', variables.examId])
      toast.success('Mark added successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add mark')
    },
  })
}

export const useImportMarks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ examId, file }) => {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await apiClient.post(
        `/curriculum/exams/${examId}/marks/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['examMarks', variables.examId])
      toast.success('Marks imported successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to import marks')
    },
  })
}

export const useExportMarks = (examId) => {
  return useQuery({
    queryKey: ['exportMarks', examId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/curriculum/exams/${examId}/marks/export`,
        {
          responseType: 'blob',
        }
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `exam_${examId}_marks.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      return response.data
    },
    enabled: false,
  })
}

export const useUpdateMarkNotes = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ examId, studentId, notes }) => {
      const { data } = await apiClient.put(
        `/curriculum/exams/${examId}/marks/${studentId}/notes`,
        { notes }
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['examMarks', variables.examId])
      toast.success('Notes updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update notes')
    },
  })
}

export const useCreateSession = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      name,
      subjectId,
      teacherId,
      roomId,
      day,
      time,
      color,
    }) => {
      const { data } = await apiClient.post('/curriculum/sessions', {
        name,
        subjectId,
        teacherId,
        roomId,
        day,
        time,
        color,
      })
      toast.success('Session created successfully')
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sessions'])
    },
    onError: () => {
      toast.error('Failed to create session')
    },
  })
}

export const useDeleteSession = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (sessionId) => {
      const { data } = await apiClient.delete(
        `/curriculum/sessions/${sessionId}`
      )
      return data
    },
    onSuccess: () => {
      toast.success('Operation Successful!')
      queryClient.invalidateQueries(['sessions'])
    },
    onError: () => {
      toast.error('Failed to delete session')
    },
  })
}

export const useGetTeacherSessions = (teacherId) => {
  return useQuery({
    queryKey: ['teacherSessions', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/teacher-sessions/${teacherId}`
      )
      return data.sessions
    },
    enabled: Boolean(teacherId),
  })
}

export const useGetStudentSessions = (studentId) => {
  return useQuery({
    queryKey: ['studentSessions', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/student-sessions/${studentId}`
      )
      return data.sessions
    },
    enabled: Boolean(studentId),
  })
}

export const useGetStudentSubjects = (studentId) => {
  return useQuery({
    queryKey: ['studentSubjects', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/student-subjects/${studentId}`
      )
      return data.subjects
    },
    enabled: Boolean(studentId),
  })
}

export const useGetStudentSessionsMinimal = (studentId) => {
  return useQuery({
    queryKey: ['studentSessionsByCourse', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/curriculum/student-minimal-sessions/${studentId}`
      )
      return data.sessions
    },
    enabled: Boolean(studentId),
  })
}

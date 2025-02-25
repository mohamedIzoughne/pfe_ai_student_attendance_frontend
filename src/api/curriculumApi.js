import { useMutation, useQuery } from '@tanstack/react-query'
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


export const useGetRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await apiClient.get('/curriculum/rooms')
      return data.rooms
    },
  })
}

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: async (roomData) => {
      const { data } = await apiClient.post(
        '/curriculum/rooms',
        roomData
      )
      return data
    },
  })
}

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: async (roomId) => {
      const { data } = await apiClient.delete(
        `/curriculum/rooms/${roomId}`
      )
      return data
    },
  })
}

export const useAddField = () => {
  return useMutation({
    mutationFn: async (fieldData) => {
      const { data } = await apiClient.post('/curriculum/fields', fieldData)
      return data
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
  return useMutation({
    mutationFn: async (fieldId) => {
      const { data } = await apiClient.delete(`/curriculum/fields/${fieldId}`)
      return data
    },
  })
}


export const useGetTeacherCourses = (teacherId) => {
  return useQuery({
    queryKey: ['teacherCourses', teacherId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/curriculum/teachers/${teacherId}/courses`)
      return data.courses
    },
    enabled: !!teacherId, // Only run when teacherId is available
  })
}

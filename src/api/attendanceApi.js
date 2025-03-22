import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './apiClient'

export const useStudentsAttendances = (courseId, sessionId = null) => {
  return useQuery({
    queryKey: ['students-attendances', courseId, sessionId],
    queryFn: async () => {
      const params = {
        course_id: courseId,
        ...(sessionId && { session_id: sessionId }),
      }

      const { data } = await apiClient.get('/attendance/students-attendances', {
        params,
      })
      return data
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  })
}

export const useCheckClassStudents = (classId, isClicked, options = {}) => {
  return useQuery({
    queryKey: ['check-class-students', classId],
    queryFn: async () => {
      const { data } = await apiClient.post(
        '/attendance/check-class-students',
        {
          classId,
        }
      )
      return data
    },
    enabled: !!classId && isClicked,
    // ...options,
    // onError: () => {
    //   console.log('Error fetching students')
    // }, // Spreading other options

    // Ensure these options are passed
    // onSettled: options.onSettled,
    // onError: options.onError,
  })
}

export const useSaveStudentAttendances = () => {
  return useMutation({
    mutationFn: async (attendanceData) => {
      const { data } = await apiClient.post(
        '/attendance/save-student-attendances',
        attendanceData
      )
      return data
    },
  })
}

export const useGetWeeklyAttendance = (courseId) => {
  return useQuery({
    queryKey: ['weeklyAttendance', courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/weekly-attendance?${
          courseId ? `courseId=${courseId}` : ''
        }`
      )
      return data
    },
    // enabled: !!courseId,
  })
}

export const useGetTeacherWeeklyAttendance = (
  teacherId,
  courseId,
  weekNumber
) => {
  return useQuery({
    queryKey: ['teacherWeeklyAttendance', teacherId, courseId, weekNumber],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/teacher/${teacherId}/weekly-attendance?${
          courseId ? `courseId=${courseId}&` : ''
        }${weekNumber ? `weekNumber=${weekNumber}` : ''}`
      )
      return data
    },
    enabled: !!teacherId,
  })
}

export const useGetCoursesAttendanceSummary = (weekNumber) => {
  return useQuery({
    queryKey: ['coursesAttendanceSummary', weekNumber],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/courses-attendance-summary${
          weekNumber ? `weekNumber=${weekNumber}` : ''
        }`
      )
      return data
    },
  })
}

export const useGetAttendanceByWeek = (weekNumber, courseId) => {
  return useQuery({
    queryKey: ['attendanceByWeek', weekNumber, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/attendance/week/${weekNumber}/${courseId}`
      )
      return data
    },
    enabled: !!weekNumber && !!courseId,
  })
}

export const useGetComplaints = (teacherId, sessionId, courseId) => {
  return useQuery({
    queryKey: ['complaints', teacherId, sessionId, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/complaints/${teacherId}?${
          sessionId ? `session_id=${sessionId}&` : ''
        }${courseId ? `course_id=${courseId}` : ''}`
      )
      return data
    },
    enabled: !!teacherId,
  })
}
  export const useRefuseComplaint = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ( complaintId ) => {
        const { data } = await apiClient.delete(
          `/attendance/complaints/${complaintId}`
        )
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['complaints'])
      },
    })
  }

  export const useAcceptComplaint = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ( complaintId ) => {
        const { data } = await apiClient.put(
          `/attendance/complaints/${complaintId}/accept`
        )
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['complaints'])
      },
    })
  }

  export const useGetStudentLastWeekAttendance = (studentId) => {
    return useQuery({
      queryKey: ['studentLastWeekAttendance', studentId],
      queryFn: async () => {
        const { data } = await apiClient.get(
          `/attendance/students/${studentId}/last-week-attendance`
        )
        return data
      },
      enabled: !!studentId,
    })
  }

export const useGetStudentAttendanceRate = (studentId, subjectId) => {
  return useQuery({
    queryKey: ['studentAttendanceRate', studentId, subjectId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/students/${studentId}/attendance-rate${subjectId ? `?studentId=${subjectId}` : ''}`
      )
      return data
    },
    enabled: !!studentId,
  })
}

export const useGetStudentComplaints = (studentId) => {
  return useQuery({
    queryKey: ['studentComplaints', studentId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/attendance/student-complaints/${studentId}`
      )
      return data
    },
    enabled: !!studentId,
  })
}

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (complaintId) => {
      const { data } = await apiClient.delete(
        `/attendance/student-complaints/${complaintId}`
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentComplaints'])
    },
  })
}

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ complaintId, updateData }) => {
      const { data } = await apiClient.put(
        `/attendance/student-complaints/${complaintId}`,
        updateData
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentComplaints'])
    },
  })
}

export const useAddComplaint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (complaintData) => {
      const { data } = await apiClient.post(
        '/attendance/complaints',
        complaintData
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentComplaints'])
    },
  })
}



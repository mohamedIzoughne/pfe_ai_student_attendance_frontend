import { useQuery, useMutation } from '@tanstack/react-query'
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
      const { data } = await apiClient.get(`/attendance/weekly-attendance/${courseId}`);
      return data;
    },
    enabled: !!courseId,
  });
};

// Get attendance for a specific week
export const useGetAttendanceByWeek = (weekNumber, courseId) => {
  return useQuery({
    queryKey: ['attendanceByWeek', weekNumber, courseId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/attendance/attendance/week/${weekNumber}/${courseId}`);
      return data;
    },
    enabled: !!weekNumber && !!courseId,
  });
};

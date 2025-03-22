import { IoAddOutline } from 'react-icons/io5'
import {
  useCreateSession,
  useGetStudentSessions,
  useGetTeacherCourses,
} from '@/api/curriculumApi'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { Button } from '../UI/button'
import { ComboboxDemo } from '../UI/ComboboxDemo'
import { useGetTeacherSubjectsByCourse } from '@/api/UsersApi'
import { useGetTeacherSessions, useDeleteSession } from '@/api/curriculumApi'
import { useParams } from 'react-router-dom'

const StudentSchedule = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const hours = [
    '08:30-10:15',
    '10:30-12:15',
    '14:30-16:15',
    '16:30-18:15',
    '08:30-12:15',
    '14:30-18:15',
  ]
  //   const { teacherId } = useParams()
  const { data: sessions } = useGetStudentSessions(1)

  return (
    <div className='div-Table div-Table-student'>
      <div className='just-title'>
        <h3>Schedule</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day} className='high-title'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className='special'>
                <p>{hour.split('-')[0]}</p>
                <p>-</p>
                <p>{hour.split('-')[1]}</p>
              </td>
              {days.map((day, dayIndex) => {
                const session = sessions?.find(
                  (s) => s.day === day && s.time === hour
                )
                return (
                  <td key={dayIndex}>
                    {session && (
                      <div
                        className='th-div p-2 rounded cursor-pointer'
                        style={{ backgroundColor: session.color }}
                      >
                        <p>
                          {session.courseName} - {session.subjectName}
                        </p>
                        <h2>{session.name}</h2>
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentSchedule

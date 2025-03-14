import { IoAddOutline } from 'react-icons/io5'
import { useCreateSession, useGetTeacherCourses } from '@/api/curriculumApi'
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

const scheduleData = [
  {
    day: 'Monday',
    time: '08:30 - 10:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Lecture',
    subjectName: 'Java',
    color: '#FDFCE8', // Light yellow
  },
  {
    day: 'Tuesday',
    time: '10:30 - 12:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Lab',
    subjectName: 'Java',
    color: '#E8FDFA', // Light cyan
  },
  {
    day: 'Thursday',
    time: '10:30 - 12:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Workshop',
    subjectName: 'Java',
    color: '#FDE8FD', // Light pink
  },
  {
    day: 'Friday',
    time: '16:30 - 18:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Project',
    subjectName: 'Java',
    color: '#E8E8FD', // Light blue
  },
]

const TeachersList = () => {
  
}

const TeacherSchedule = () => {
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [sessionFormData, setSessionFormData] = useState({
    name: '',
    selectedCourse: {},
    selectedSubject: {},
    roomId: '',
    color: '',
  })

  const createSession = useCreateSession()
  const deleteSession = useDeleteSession()
  const { data: sessions } = useGetTeacherSessions(1)
  const { data: courses } = useGetTeacherCourses(1)
  const { data: subjects } = useGetTeacherSubjectsByCourse(
    1,
    sessionFormData?.selectedCourse?.id
  )

  console.log('-----The-Subjects--------', subjects)

  const handleAddClick = (day, time) => {
    setSelectedDay(day)
    setSelectedTime(time)
    setSessionFormData({
      name: '',
      selectedCourse: {},
      selectedSubject: {},
      roomId: '',
      color: '',
    })
    setIsDialogOpen(true)
  }

  const handleSessionClick = (session) => {
    setSelectedSession(session)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSession = () => {
    deleteSession.mutate(selectedSession.id)
    setIsDeleteDialogOpen(false)
  }

  const handleEditingSession = (changedAttribute) => {
    setSessionFormData((prev) => ({ ...prev, ...changedAttribute }))
  }

  const isFormValid = () => {
    return (
      sessionFormData.name.trim() !== '' &&
      sessionFormData.selectedCourse.id &&
      sessionFormData.selectedSubject.id &&
      sessionFormData.roomId.trim() !== '' &&
      sessionFormData.color.trim() !== ''
    )
  }

  return (
    <div className='div-Table'>
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
                    {session ? (
                      <div
                        className='th-div p-2 rounded cursor-pointer'
                        style={{ backgroundColor: session.color }}
                        onClick={() => handleSessionClick(session)}
                      >
                        <p>
                          {session.courseName} - {session.subjectName}
                        </p>
                        <h2>{session.name}</h2>
                      </div>
                    ) : (
                      <button onClick={() => handleAddClick(day, hour)}>
                        <IoAddOutline className='stroke-[#538cac] Add-Button' />
                      </button>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              createSession.mutate({
                name: sessionFormData.name,
                subjectId: sessionFormData.selectedSubject.id,
                roomId: sessionFormData.roomId,
                day: selectedDay,
                time: selectedTime,
                color: sessionFormData.color,
                teacherId: 1,
              })
              setIsDialogOpen(false)
            }}
          >
            <div>
              <Label
                htmlFor='sessionName'
                className='mt-2 text-xs mb-1 ml-[2px]'
              >
                Session Name
              </Label>
              <Input
                id='sessionName'
                className='mb-2'
                value={sessionFormData.name}
                onChange={(e) => handleEditingSession({ name: e.target.value })}
                placeholder='Session Name'
              />

              <Label
                htmlFor='courseSelect'
                className='mt-2 text-xs mb-1 ml-[2px]'
              >
                Select Course
              </Label>
              <ComboboxDemo
                id='courseSelect'
                className='mb-2'
                onSelect={(selected) =>
                  handleEditingSession({ selectedCourse: selected })
                }
                placeholder='Select Course'
                options={courses}
                // value={sessionFormData.selectedCourse}
              />

              <Label
                htmlFor='subjectSelect'
                className='mt-2 text-xs mb-1 ml-[2px]'
              >
                Select Subject
              </Label>
              <ComboboxDemo
                id='subjectSelect'
                className='mb-2'
                onSelect={(selected) =>
                  handleEditingSession({ selectedSubject: selected })
                }
                placeholder='Select Subject'
                options={subjects}
                // value={sessionFormData.selectedSubject}
                disabled={!sessionFormData.selectedCourse.id}
              />

              <Label htmlFor='roomId' className='mt-2 text-xs mb-1 ml-[2px]'>
                Room ID
              </Label>
              <Input
                id='roomId'
                className='mb-2'
                value={sessionFormData.roomId}
                onChange={(e) =>
                  handleEditingSession({ roomId: e.target.value })
                }
                placeholder='Room ID'
              />

              <Label htmlFor='color' className='mt-2 text-xs mb-1 ml-[2px]'>
                Color
              </Label>
              <Input
                id='color'
                className='mb-2'
                value={sessionFormData.color}
                onChange={(e) =>
                  handleEditingSession({ color: e.target.value })
                }
                placeholder='Color (e.g. #FDFCE8)'
              />
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant='secondary'
              >
                Cancel
              </Button>
              <Button type='submit' disabled={!isFormValid()}>
                Add Session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Session</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this session?</p>
          <DialogFooter>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              variant='secondary'
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteSession} variant='destructive'>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TeacherSchedule

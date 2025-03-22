/* eslint-disable react/prop-types */
import './AttendanceMarking.css'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'
import manImage2 from '@/assets/images/search.png'
import manImage3 from '@/assets/images/WhatsApp Image 2025-02-11 à 23.37.14_feef5af2.jpg'
import Header from '@/components/Header'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Loader2 } from 'lucide-react'
import { useGetCourses, useGetSessions } from '@/api/curriculumApi'
import {
  useCheckClassStudents,
  useStudentsAttendances,
  useSaveStudentAttendances,
} from '@/api/attendanceApi'
import { API_URL } from '@/api/apiClient'
import { BsRecordFill } from 'react-icons/bs'
import { Save } from 'lucide-react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

const SOCKET_SERVER_URL = 'http://localhost:5000' // Change this if needed
const Options = ({ width = '200px', setStudents, newStudents = [] }) => {
  const [isSessionsOpen, setIsSessionsOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState({})
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const { data: courses = [] } = useGetCourses(1, 'teacher')
  const { data: sessions = [] } = useGetSessions(selectedCourse.id)
  const { data: students } = useStudentsAttendances(
    selectedCourse.id,
    selectedSession.id
  )
  const [buttonIsClicked, setButtonIsClicked] = useState(false)
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const {
    data: attendances,
    isLoading,
    isError,
    isSuccess,
  } = useCheckClassStudents(selectedCourse.id, buttonIsClicked)

  useEffect(() => {
    if (isError) {
      toast.error('An error occurred')
      setButtonIsClicked(false)
    } else if (isSuccess) {
      toast.error('Scanning finished successfully')
    }
  }, [isError, isSuccess])

  const { mutate: saveAttendance, isLoading: isSaving } =
    useSaveStudentAttendances()

  const handleClickButton = () => {
    setButtonIsClicked(true)
  }

  const handleSaveAttendance = () => {
    const attendances = newStudents.map((student) => ({
      studentId: student.id,
      isPresent: student.isPresent || false,
    }))

    const studentAttendances = {
      attendances,
      courseId: selectedCourse.id,
      sessionId: selectedSession.id,
    }
    saveAttendance(studentAttendances)
  }

  useEffect(() => {
    if (students) {
      setStudents(students)
    }
  }, [students, setStudents])

  return (
    <>
      <Toaster />
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              An unexpected error occurred. Please refresh the page or contact
              support.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-3'>
            <Button
              variant='outline'
              onClick={() => setIsErrorDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsErrorDialogOpen(false)
                handleClickButton()
              }}
            >
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className='mini-div-center'>
        <div>
          <Popover open={isCoursesOpen} onOpenChange={setIsCoursesOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={isCoursesOpen}
                className='flex items-center justify-between px-4 py-2'
                style={{ width: '200px' }}
              >
                <span className='truncate'>
                  {selectedCourse.name
                    ? courses.find((course) => course.id === selectedCourse.id)
                        ?.name
                    : 'Select course...'}
                </span>

                <ChevronsUpDown className='h-4 w-4 opacity-50 ml-2' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' style={{ width }}>
              <Command>
                <CommandInput placeholder='Search course...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No course found.</CommandEmpty>
                  <CommandGroup>
                    {courses.map((course) => (
                      <CommandItem
                        key={course.id}
                        value={course.name}
                        onSelect={(currentValue) => {
                          setSelectedCourse(
                            currentValue === selectedCourse.name ? {} : course
                          )
                          setIsCoursesOpen(false)
                        }}
                      >
                        {course.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            selectedCourse.name === course.name
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover open={isSessionsOpen} onOpenChange={setIsSessionsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={isSessionsOpen}
                className='flex items-center justify-between px-4 py-2'
                style={{ width: '200px' }}
              >
                <span className='truncate'>
                  {selectedSession.name
                    ? sessions.find(
                        (session) => session.id === selectedSession.id
                      )?.name
                    : 'Select session...'}
                </span>
                <ChevronsUpDown className='h-4 w-4 opacity-50 ml-2' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' style={{ width }}>
              <Command>
                <CommandInput placeholder='Search session...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No session found.</CommandEmpty>
                  <CommandGroup>
                    {sessions.map((session) => (
                      <CommandItem
                        key={session.id}
                        value={session.name}
                        onSelect={(currentValue) => {
                          setSelectedSession(
                            currentValue === selectedSession.name ? {} : session
                          )
                          setIsSessionsOpen(false)
                        }}
                      >
                        {session.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            selectedSession.id === session.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex gap-2'>
          <div className='relative min-w-32'>
            <Button
              disabled={!selectedCourse.name || isLoading}
              className='w-full'
              onClick={handleClickButton}
            >
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin stroke-white ' />
                  Please wait...
                </>
              ) : (
                <>
                  <BsRecordFill className='fill-white' />
                  Start Recording
                </>
              )}
            </Button>
          </div>
          <Button
            disabled={
              !selectedCourse.name ||
              !selectedSession.name ||
              isLoading ||
              isSaving
            }
            className=''
            onClick={handleSaveAttendance}
          >
            {isSaving ? (
              <>
                Saving...
                <Loader2 className='animate-spin h-4 w-4 stroke-white' />
              </>
            ) : (
              <>
                Save
                <Save className='h-4 w-4 stroke-white' />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

const AttendanceMarking = () => {
  const [students, setStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [socket, setSocket] = useState(null)
  const [status, setStatus] = useState('Not connected')

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io(SOCKET_SERVER_URL)
    setSocket(newSocket)

    newSocket.on('connect', () => {
      setStatus('Connected ✅')
      console.log('Connected to WebSocket')
    })

    newSocket.on('disconnect', () => {
      setStatus('Disconnected ❌')
      console.log('Disconnected from WebSocket')
    })

    newSocket.on('student_detected', (data) => {
      console.log('Received:', data)
      console.log(new Date())
      setStudents((prevStudents) => {
        const updatedStudents = prevStudents.map((student) => {
          if (student.id === data.studentId) {
            return { ...student, isPresent: true }
          }
          return student
        })
        return updatedStudents
      })
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleCheck = (studentId, checked) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (student.id === studentId) {
          return { ...student, isPresent: checked }
        }
        return student
      })
    })
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  console.log(students)

  return (
    <>
      <Header />
      <div className='title'>
        <h3> Mark Attendance </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center'>
        <div>
          <Input 
            placeholder='Search Student name' 
            value={searchQuery}
            onChange={handleSearch}
          />
          <img src={manImage2} alt='' />
        </div>

        <Options newStudents={students} setStudents={setStudents} />
      </div>

      <table className='Table-record'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Attendance %</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr className='py-5' key={student.id}>
              <td className='object-cover'>
                <img src={`${API_URL}/${student.image}`} alt='' />
              </td>
              <td>{student.name}</td>
              <td>{student.id}</td>
              <td>{student.attendance}</td>
              <td>
                <Switch
                  checked={student.isPresent}
                  onCheckedChange={(checked) =>
                    handleCheck(student.id, checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default AttendanceMarking

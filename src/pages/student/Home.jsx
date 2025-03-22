import './Home_student.css'

import { Bell } from 'lucide-react'
import { IoAddOutline } from 'react-icons/io5'
import { useState } from 'react'

import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'

import { IoEllipsisVertical } from 'react-icons/io5'
import { MdOutlineQuiz } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineTask } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'

import { Input } from '@/components/ui/input'
// import { ComboboxDemo } from "@/components/ui/ComboboxDemo";
import manImage2 from '@/assets/images/search.png'
import { useGetTeacherDashboardData } from '@/api/UsersApi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { IoHandLeftOutline } from 'react-icons/io5'
import { IoMdCheckmark } from 'react-icons/io'
import Header from '@/components/Header'
import StudentSchedule from '@/components/student/StudentSchedule'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { useGetTeacherSubjects } from '@/api/UsersApi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Plus, Edit, Trash } from 'lucide-react'
import {
  useGetStudentComplaints,
  useDeleteComplaint,
  useUpdateComplaint,
  useAddComplaint,
} from '@/api/attendanceApi'
import {
  useGetStudentSessionsMinimal,
  useGetStudentSubjects,
} from '@/api/curriculumApi'
import { ComboboxDemo } from '@/components/UI/ComboboxDemo'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useMemo } from 'react'

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

const Home = () => {
  const { data: dashboardData } = useGetTeacherDashboardData(1)
  const { data: subjects, isLoading, isError } = useGetStudentSubjects(1)
  const { data: complaints } = useGetStudentComplaints(1)
  const deleteComplaint = useDeleteComplaint()
  const updateComplaint = useUpdateComplaint()
  const addComplaint = useAddComplaint()
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [complaintToDelete, setComplaintToDelete] = useState(null)
  const [complaintData, setComplaintData] = useState({
    id: null,
    excuse: '',
    date: '',
  })
  const [date, setDate] = useState()
  const { data: sessions } = useGetStudentSessionsMinimal(1)
  const [newComplaint, setNewComplaint] = useState({
    excuse: '',
    date: '',
    session: {},
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredComplaints = useMemo(() => {
    if (!complaints) return []
    return complaints.filter((complaint) =>
      complaint.excuse.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [complaints, debouncedSearchTerm])

  const handleAddComplaint = async (e) => {
    e.preventDefault()
    await addComplaint.mutateAsync({
      excuse: newComplaint.excuse,
      date: newComplaint.date,
      sessionId: newComplaint.session.id,
      studentId: 1,
    })
    setIsComplaintDialogOpen(false)
    setNewComplaint({
      excuse: '',
      date: '',
      session: {},
    })
  }

  const handleEditComplaint = async (e) => {
    e.preventDefault()
    await updateComplaint.mutateAsync({
      complaintId: complaintData.id,
      updateData: {
        excuse: complaintData.excuse,
        date: complaintData.date,
      },
    })
    setIsEditDialogOpen(false)
  }

  const handleDeleteComplaint = async (complaintId) => {
    await deleteComplaint.mutateAsync(complaintId)
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <Header />

      <div className='bg-[#f0f1f5]'>
        <div className='contanier-student container-lg mx-auto'>
          <div className='flex w-full mt-12'>
            <StudentSchedule />

            <div className='end-part end-part-2 mt-0 min-h-full '>
              <div className='header-end-part'>
                <div>
                  <h2>Your Subjects</h2>
                  <span>{dashboardData?.totalSubjects || 0}</span>
                </div>
                <IoEllipsisVertical className='treee' />
              </div>
              {subjects &&
                subjects.map((subject) => (
                  <div key={subject.id}>
                    <div className='main-end-part-p'>
                      <div className='main-end-part'>
                        <div>
                          <h2>{subject.name}</h2>
                          <p>Sessions</p>
                          <span>{subject.numSessions}</span>
                        </div>
                        <div className='particulier'>
                          <p>Hours</p>
                          <span>{subject.totalHours}</span>
                        </div>
                      </div>
                      <div className='mod-end-part'>
                        {subject.quizzes &&
                          subject.quizzes.map((quiz, i) => (
                            <div key={`quiz-${i}`} className='mod-1'>
                              <div className='mod-1-1'>
                                <MdOutlineQuiz className='icon-mod' />
                                <div className='Info-Info'>
                                  <h2>{quiz.name}</h2>
                                  <p>{formatDate(quiz?.date)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        {subject.upcomingExams &&
                          subject.upcomingExams.map((exam, i) => (
                            <div key={`exam-${i}`} className='mod-1'>
                              <div className='mod-1-1'>
                                <MdOutlineTask className='icon-mod' />
                                <div className='Info-Info'>
                                  <h2>{exam.name}</h2>
                                  <p>{formatDate(exam?.date)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className='Complaint-consult'>
            <div className='title'>
              <h3> Complaints </h3>
              <div className='vide'>
                <div className='vide-vide'></div>
              </div>
            </div>

            <div className='div-center'>
              <div>
                <Input
                  placeholder='Search excuse'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={manImage2} alt='' />
              </div>
              <div className='mini-div-center'>
                <div>
                  <Dialog
                    open={isComplaintDialogOpen}
                    onOpenChange={setIsComplaintDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <button className='btn1'>+</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Complaint</DialogTitle>
                        <DialogDescription>
                          Fill in the details to add a new student complaint.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleAddComplaint}>
                        <div className='grid gap-4 py-4'>
                          <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='session' className='text-right'>
                              Session
                            </label>
                            <div className='col-span-3'>
                              <ComboboxDemo
                                placeholder='Select a session'
                                options={sessions}
                                onSelect={(value) => {
                                  setNewComplaint((newComplaint) => ({
                                    ...newComplaint,
                                    session: value,
                                  }))
                                }}
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='excuse' className='text-right'>
                              Excuse
                            </label>
                            <Textarea
                              className='col-span-3'
                              placeholder='Type your execuse here.'
                              onChange={(e) => {
                                setNewComplaint((prev) => ({
                                  ...prev,
                                  excuse: e.target.value,
                                }))
                              }}
                            />
                          </div>
                          <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='date' className='text-right'>
                              Date
                            </label>
                            <div className='col-span-3'>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-[240px] justify-start text-left font-normal',
                                      !date && 'text-muted-foreground'
                                    )}
                                  >
                                    <CalendarIcon />
                                    {date ? (
                                      format(date, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className='w-auto p-0'
                                  align='start'
                                >
                                  <Calendar
                                    mode='single'
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                      setDate(selectedDate)
                                      setNewComplaint((prev) => ({
                                        ...prev,
                                        date: selectedDate,
                                      }))
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type='submit'>Save</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <table className='complaints-table'>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Excuse</th>
                  <th>Session</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td className='std-namee'>{complaint.subjectName}</td>
                    <td className='execuse'>{complaint.excuse}</td>
                    <td className='sessionn'>
                      {complaint.sessionName} - {formatDate(complaint.date)}
                    </td>
                    <td>
                      <div className='icons-reason flex justify-center align-middle'>
                        <Dialog
                          open={isEditDialogOpen}
                          onOpenChange={setIsEditDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <FiEdit3
                              className='cursor-pointer mr-2'
                              onClick={() => {
                                setComplaintData({
                                  id: complaint.id,
                                  excuse: complaint.excuse,
                                  date: complaint.date,
                                })
                              }}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Complaint</DialogTitle>
                              <DialogDescription>
                                Edit your complaint details.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleEditComplaint}>
                              <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                  <label
                                    htmlFor='excuse'
                                    className='text-right'
                                  >
                                    Excuse
                                  </label>
                                  <Textarea
                                    className='col-span-3'
                                    value={complaintData.excuse}
                                    onChange={(e) =>
                                      setComplaintData((prev) => ({
                                        ...prev,
                                        excuse: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                  <label htmlFor='date' className='text-right'>
                                    Date
                                  </label>
                                  <div className='col-span-3'>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant={'outline'}
                                          className={cn(
                                            'w-[240px] justify-start text-left font-normal',
                                            !complaintData.date &&
                                              'text-muted-foreground'
                                          )}
                                        >
                                          <CalendarIcon />
                                          {complaintData.date ? (
                                            format(
                                              new Date(complaintData.date),
                                              'PPP'
                                            )
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className='w-auto p-0'
                                        align='start'
                                      >
                                        <Calendar
                                          mode='single'
                                          selected={
                                            complaintData.date
                                              ? new Date(complaintData.date)
                                              : undefined
                                          }
                                          onSelect={(selectedDate) =>
                                            setComplaintData((prev) => ({
                                              ...prev,
                                              date: selectedDate,
                                            }))
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type='submit'>Save changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={isDeleteDialogOpen}
                          onOpenChange={setIsDeleteDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <RiDeleteBinLine
                              className='stroke-[red] cursor-pointer'
                              onClick={() => setComplaintToDelete(complaint.id)}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this complaint?
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant='outline'
                                onClick={() => setIsDeleteDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant='destructive'
                                onClick={() =>
                                  handleDeleteComplaint(complaintToDelete)
                                }
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

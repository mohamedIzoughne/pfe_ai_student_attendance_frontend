import './Exams.css'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'
import { IoMdTime } from 'react-icons/io'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { CiCircleCheck } from 'react-icons/ci'
import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

import manImage10 from '@/assets/images/man-438081_960_720.png'
import manImage11 from '@/assets/images/More.png'

import { useGetExams, useGetTeacherCourses } from '@/api/curriculumApi'

import { formatDate } from '@/lib/utils'
import Header from '@/components/Header'
import { useGetTeacherSubjectsByCourse } from '@/api/UsersApi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Trash, Edit } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  // Input,
  // Select,
  // SelectTrigger,
  // SelectValue,
  // SelectItem,
} from '@/components/ui/dialog'
import { Input } from '@/components/UI/input'

const Exams = () => {
  const [selectedSubject, setSelectedSubject] = useState({})
  const [selectedCourse, setSelectedCourse] = useState({})
  const [examName, setExamName] = useState('')
  const [duration, setDuration] = useState('')
  const [dueDate, setDueDate] = useState()
  const [date, setDate] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [modalType, setModalType] = useState(null) // 'edit' or 'delete'

  const { data: courses } = useGetTeacherCourses(1)
  const { data: subjects } = useGetTeacherSubjectsByCourse(
    1,
    selectedCourse?.id
  )
  const { data: exams } = useGetExams(
    1,
    selectedSubject?.id,
    date,
    selectedCourse?.id
  )

  const handleEditExam = (exam) => {
    setSelectedExam(exam)
    setExamName(exam.examName)
    setSelectedCourse({ id: exam.courseId, name: exam.courseName })
    setSelectedSubject({ id: exam.subjectId, name: exam.subjectName })
    setDuration(exam.duration)
    setDueDate(new Date(exam.dueDate))
    setModalType('edit')
    setShowDialog(true)
  }

  const handleDeleteExam = (exam) => {
    setSelectedExam(exam)
    setModalType('delete')
    setShowDialog(true)
  }

  const handleConfirmDelete = () => {
    console.log('Deleting exam:', selectedExam)
    setShowDialog(false)
  }

  const handleSaveExam = () => {
    console.log('Saving exam:', {
      examName,
      selectedCourse,
      selectedSubject,
      duration,
      dueDate,
    })
    setShowDialog(false)
  }

  return (
    <>
      <Header />
      <div className='title'>
        <h3>Exams</h3>
      </div>

      <div className='buttons'>
        <div className='Picker'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className='w-[190px] justify-start text-left font-normal'
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <ComboboxDemo
            width='100%'
            options={courses}
            onSelect={setSelectedCourse}
            placeholder='Select Course'
          />
        </div>
        <div>
          <ComboboxDemo
            width='100%'
            options={subjects}
            onSelect={setSelectedSubject}
            placeholder='Select Subject'
          />
        </div>
      </div>

      <div className='Principal'>
        {exams?.map((exam) => (
          <div key={exam.id} className='container-exams'>
            <div className='carte'>
              <div>
                <h5>{exam.subjectName}</h5>
                <h1>{exam.examName}</h1>
                <h5>{exam.courseName}</h5>
              </div>
              <div className='two'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='block'>
                      <IoEllipsisHorizontal className='trois' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditExam(exam)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteExam(exam)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span>{exam.duration}</span>
              </div>
            </div>
            <div className='More-date'>
              <p>{formatDate(exam.dueDate)}</p>
              {exam.isDuePassed ? <CiCircleCheck /> : <IoMdTime />}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing or Deleting */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          {modalType === 'edit' ? (
            <>
              <DialogHeader>
                <DialogTitle>Edit Exam</DialogTitle>
              </DialogHeader>
              <div>
                <Input
                  className='mb-2'
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder='Exam Name'
                />
                <ComboboxDemo
                  className='mb-2'
                  onSelect={setSelectedCourse}
                  placeholder='Select Course'
                  options={courses}
                  value={selectedCourse}
                />
                <ComboboxDemo
                  className='mb-2'
                  onSelect={setSelectedSubject}
                  placeholder='Select Subject'
                  options={subjects}
                  value={selectedSubject}
                />
                <Input
                  value={duration}
                  className='mb-2'
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder='Duration (minutes)'
                  type='number'
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='outline'>
                      {dueDate ? (
                        format(dueDate, 'PPP')
                      ) : (
                        <span>Select Due Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant='secondary'
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveExam}>Save Changes</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>
                Are you sure you want to delete the exam "
                {selectedExam?.examName}"?
              </p>
              <DialogFooter>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant='secondary'
                >
                  Cancel
                </Button>
                <Button variant='destructive' onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Exams

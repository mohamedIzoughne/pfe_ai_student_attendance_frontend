import './Exams.css'
import { Plus } from 'lucide-react'
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

import {
  useCreateExam,
  useGetCourses,
  useGetExams,
  useGetTeacherCourses,
  useRemoveExam,
  useUpdateExam,
} from '@/api/curriculumApi'

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { formatMinutes } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const Exams = () => {
  const [selectedSubject, setSelectedSubject] = useState({})
  const [selectedCourse, setSelectedCourse] = useState({})
  const [examFormData, setExamFormData] = useState({
    id: null,
    name: '',
    subjectId: null,
    duration: 0,
    dueDate: null,
    selectedCourse: {},
    selectedSubject: {},
  })
  const navigate = useNavigate()

  const [date, setDate] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [modalType, setModalType] = useState(null) // 'edit', 'delete', or 'add'

  const { mutate: updateExam } = useUpdateExam()
  const { mutate: removeExam } = useRemoveExam()
  const { mutate: addExam } = useCreateExam() // Add this hook for creating exams
  // const { data: courses } = useGetTeacherCourses(1)
  const { data: courses } = useGetCourses(1, 'teacher')
  const { data: subjects } = useGetTeacherSubjectsByCourse(
    1,
    selectedCourse?.id
  )
  const { data: editingExamSubjects } = useGetTeacherSubjectsByCourse(
    1,
    examFormData.selectedCourse.id
  )

  const { data: exams } = useGetExams(
    1,
    selectedSubject?.id,
    date,
    selectedCourse?.id
  )

  const handleAddExam = () => {
    // Reset the editingExam state to empty values for a new exam
    setExamFormData({
      id: null,
      name: '',
      subjectId: null,
      duration: 0,
      dueDate: null,
      selectedCourse: {},
      selectedSubject: {},
    })
    setModalType('add')
    setShowDialog(true)
  }

  const handleEditExam = (exam) => {
    setSelectedExam(exam)
    setExamFormData({
      id: exam.id,
      name: exam.examName,
      selectedSubject: { id: exam.subjectId, name: exam.subjectName },
      selectedCourse: { id: exam.courseId, name: exam.courseName },
      duration: exam.duration,
      dueDate: new Date(exam.dueDate),
    })

    setModalType('edit')
    setShowDialog(true)
  }

  const handleEditingExam = (changedAttribute) => {
    setExamFormData((prev) => ({ ...prev, ...changedAttribute }))
  }

  const handleDeleteExam = (exam) => {
    setSelectedExam(exam)
    setModalType('delete')
    setShowDialog(true)
  }

  const handleConfirmDelete = () => {
    removeExam(selectedExam.id)
    setShowDialog(false)
  }

  const handleSaveExam = () => {
    if (modalType === 'edit') {
      const editedExamData = {
        examId: examFormData.id,
        examData: {
          name: examFormData.name,
          subjectId: examFormData.selectedSubject.id,
          duration: examFormData.duration,
          dueDate: examFormData.dueDate,
        },
      }
      updateExam(editedExamData)
    } else if (modalType === 'add') {
      const newExamData = {
        name: examFormData.name,
        subjectId: examFormData.selectedSubject.id,
        duration: examFormData.duration,
        dueDate: examFormData.dueDate,
      }
      addExam({ teacherId: 1, examData: newExamData })
    }

    setShowDialog(false)
  }

  // Validate if form is complete
  const isFormValid = () => {
    return (
      examFormData.name.trim() !== '' &&
      ((examFormData.selectedCourse.id && examFormData.selectedSubject.id) ||
        modalType === 'edit') &&
      examFormData.duration > 0 &&
      examFormData.dueDate
    )
  }

  return (
    <>
      <Header />
      <div className='title'>
        <h3> Exams </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
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
            width='150px'
            options={courses}
            onSelect={setSelectedCourse}
            placeholder='Select Class'
          />
        </div>
        <div>
          <ComboboxDemo
            width='150px'
            options={subjects}
            onSelect={setSelectedSubject}
            placeholder='Select Subject'
          />
        </div>
        <div>
          <Button variant='outline' onClick={handleAddExam}>
            <Plus className='stroke-[#848485]' />
          </Button>
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
              <div className='two flex flex-col items-end'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='block'>
                      <IoEllipsisHorizontal className='trois' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate(`/exams/exam-marks/${exam.id}`)}
                    >
                      View marks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditExam(exam)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteExam(exam)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span>{formatMinutes(exam.duration)}</span>
              </div>
            </div>
            <div className='More-date'>
              <p>{formatDate(exam.dueDate)}</p>
              {exam.isDuePassed ? <CiCircleCheck /> : <IoMdTime />}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding, Editing or Deleting */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          {modalType === 'edit' || modalType === 'add' ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {modalType === 'edit' ? 'Edit Exam' : 'Add New Exam'}
                </DialogTitle>
              </DialogHeader>
              <div>
                <Label
                  htmlFor='examName'
                  className='mt-2 text-xs mb-1 ml-[2px]'
                >
                  Exam Name
                </Label>
                <Input
                  id='examName'
                  className='mb-2'
                  value={examFormData.name}
                  onChange={(e) => handleEditingExam({ name: e.target.value })}
                  placeholder='Exam Name'
                />

                <Label
                  htmlFor='courseSelect'
                  className='mt-2 text-xs mb-1 ml-[2px]'
                >
                  Select Class
                </Label>
                <ComboboxDemo
                  id='courseSelect'
                  className='mb-2'
                  onSelect={(selected) =>
                    handleEditingExam({ selectedCourse: selected })
                  }
                  placeholder='Select Class'
                  options={courses}
                  value={examFormData.selectedCourse}
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
                    handleEditingExam({ selectedSubject: selected })
                  }
                  placeholder='Select Subject'
                  options={editingExamSubjects}
                  value={examFormData.selectedSubject}
                  disabled={!examFormData.selectedCourse.id}
                />

                <Label
                  htmlFor='duration'
                  className='mt-2 text-xs mb-1 ml-[2px]'
                >
                  Duration (minutes)
                </Label>
                <Input
                  id='duration'
                  value={examFormData.duration}
                  className='mb-2'
                  onChange={(e) =>
                    handleEditingExam({
                      duration: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  placeholder='Duration (minutes)'
                  type='number'
                  min='1'
                />

                <Label
                  htmlFor='dueDate'
                  className='block mt-2 text-xs mb-1 ml-[2px]'
                >
                  Select Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id='dueDate' variant='outline'>
                      {examFormData.dueDate ? (
                        format(examFormData.dueDate, 'PPP')
                      ) : (
                        <span>Select Due Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={examFormData.dueDate}
                      onSelect={(date) => handleEditingExam({ dueDate: date })}
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
                <Button onClick={handleSaveExam} disabled={!isFormValid()}>
                  {modalType === 'edit' ? 'Save Changes' : 'Add Exam'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>
                Are you sure you want to delete the exam &quot;
                {selectedExam?.examName}&quot;?
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

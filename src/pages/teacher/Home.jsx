import { useState } from 'react'
import { Bell } from 'lucide-react'
import './Home.css'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'

import manImage4 from '@/assets/images/man-438081_960_720.png'
import manImage5 from '@/assets/images/More.png'
import manImage6 from '@/assets/images/Icon.png'
import manImage7 from '@/assets/images/Icon (1).png'
import manImage8 from '@/assets/images/Icon (2).png'
import manImage9 from '@/assets/images/Icon (3).png'

import PieChartComponent from '@/components/ui/PieChartComponent'
import Example from '@/components/ui/LineChart'
import Barchart from '@/components/UI/StackBarchart'

import { IoAddOutline } from 'react-icons/io5'
import { IoEllipsisVertical } from 'react-icons/io5'
import { MdOutlineQuiz } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineTask } from 'react-icons/md'
import Header from '@/components/Header'
import {
  useGetTeacherDashboardData,
  useGetTeacherSubjects,
} from '@/api/UsersApi'
import StudentsPieChartComponent from '@/components/teacher/StudentsGenderPieChart'
import WeeklyAttendanceChart from '@/components/teacher/WeeklyAttendanceChart'
import TeacherSchedule from '@/components/teacher/TeacherSchedule'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/utils'
import { Edit, Trash, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function Home() {
  const { data: dashboardData } = useGetTeacherDashboardData(1) // Replace with actual teacherId

  return (
    <>
      <Header />

      <div className='container'>
        <div className='div1'>
          <div>
            <h3>Total Students</h3>
            <span>{dashboardData?.totalStudents || 0}</span>
          </div>
          <img src={manImage6} alt='' />
        </div>
        <div className='div1'>
          <div>
            <h3>Total Subjects</h3>
            <span>{dashboardData?.totalSubjects || 0}</span>
          </div>
          <img src={manImage7} alt='' />
        </div>
        <div className='div1'>
          <div>
            <h3>Total Complaints</h3>
            <span>{dashboardData?.totalComplaints || 0}</span>
          </div>
          <img src={manImage8} alt='' />
        </div>
        <div className='div1 '>
          <div>
            <h3>Total Hours</h3>
            <span>{dashboardData?.totalHours || 0}</span>
          </div>
          <img src={manImage9} alt='' />
        </div>
      </div>

      <div className='container-2'>
        {/* <div className='div2'>
          <div className='mini-div-2'>
            <h4>Students by Gender</h4>
            <div>
              <ComboboxDemo
                className='comboButton'
                width='105px'
                placeholder=''
              />
            </div>
          </div>

          <div className='piechart-1'>
            <PieChartComponent />
          </div>
        </div> */}
        <StudentsPieChartComponent />

        <WeeklyAttendanceChart />
      </div>

      <TeacherSchedule />
      {/* <div className='div-Table'>
        <div className='just-title'>
          <h3>Schedule</h3>
        </div>
        <table>
          <tr>
            <th></th>
            <th className='high-title'>Monday</th>
            <th className='high-title'>Tuesday</th>
            <th className='high-title'>Wednesday</th>
            <th className='high-title'>Thursday</th>
            <th className='high-title'>Friday</th>
            <th className='high-title'>Saturday</th>
          </tr>
          <tr>
            <td className='special'>
              8h30m <br /> - <br />
              10h15m
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#FDFCE8]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
          </tr>
          <tr>
            <td className='special'>
              10h30m <br /> - <br />
              12h15m
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#FDFCE8]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#F8ECF6]' color='#F8ECF6'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#FDFCE8]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
          </tr>
          <tr>
            <td className='special'>
              14h30m <br /> - <br />
              16h15m
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#F8ECF6]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
          </tr>
          <tr>
            <td className='special'>
              16h30m <br /> - <br />
              18h15m
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#FDFCE8]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              {' '}
              <div className='th-div bg-[#F3F0FF]'>
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className='stroke-[#538cac] Add-Button' />
              </button>
            </td>
          </tr>
        </table>
      </div> */}

      <div className='partie-barchart-principal'>
        <div className='partie-barchart'>
          <div className='title-barchart'>
            <h2>Class Attendance</h2>
            <div>
              <ComboboxDemo width='100px' />
            </div>
          </div>
          <Barchart />
        </div>

        <Subjects />
      </div>
    </>
  )
}

const Subjects = () => {
  const { data: subjects, isLoading, isError } = useGetTeacherSubjects(1)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const openDeleteDialog = (subject) => {
    setSelectedSubject(subject)
    setIsDeleteDialogOpen(true)
  }

  const [questions, setQuestions] = useState([])

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', ''] }])
  }

  const updateQuestionText = (index, text) => {
    const newQuestions = [...questions]
    newQuestions[index].text = text
    setQuestions(newQuestions)
  }

  const addAnswer = (qIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].answers.push('')
    setQuestions(updatedQuestions)
  }

  const updateAnswer = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].answers[aIndex] = value
    setQuestions(updatedQuestions)
  }

  return (
    <div className='end-part'>
      <div className='header-end-part'>
        <div>
          <h2>Your Subjects</h2>
          <span>{subjects?.length || 0}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <IoEllipsisVertical className='treee' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsAddDialogOpen(true)}>
              <Plus className='w-4 h-4 mr-1' /> Add new subject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>
                        <IoEllipsisVertical className='treee' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setIsExamDialogOpen(true)}
                      >
                        <Plus className='w-4 h-4 mr-1' /> Add new exam
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setIsQuizDialogOpen(true)}
                      >
                        <Plus className='w-4 h-4 mr-1' /> Add new quiz
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className='w-4 h-4 mr-1' /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(subject)}
                      >
                        <Trash className='w-4 h-4 mr-1 text-red-500' /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className='mod-end-part'>
                {subject.quizzes &&
                  subject.quizzes.map((quiz, i) => (
                    <div key={`exam-${i}`} className='mod-1'>
                      <div className='mod-1-1'>
                        <MdOutlineQuiz className='icon-mod' />
                        <div className='Info-Info'>
                          <h2>{quiz.name}</h2>
                          <p>{formatDate(quiz?.date)}</p>{' '}
                        </div>
                      </div>
                      <div>
                        <RiDeleteBinLine className='icon-mod icon-mod-delete' />
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
                          <p>{formatDate(exam?.date)}</p>{' '}
                        </div>
                      </div>
                      <div>
                        <RiDeleteBinLine className='icon-mod icon-mod-delete' />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Enter subject name'
              className='w-full p-2 border rounded'
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding subject...')}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Exam</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Exam Name'
              className='w-full p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Duration'
              className='w-full p-2 border rounded mt-2'
            />
            <input
              type='date'
              placeholder='Due Date'
              className='w-full p-2 border rounded mt-2'
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsExamDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding exam...')}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Add New Quiz</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Quiz Name'
              className='w-full p-2 border rounded'
            />
            <input
              type='date'
              placeholder='Due Date'
              className='w-full p-2 border rounded mt-2'
            />
            <Button className='mt-2' onClick={addQuestion}>
              Add Question
            </Button>
          </div>
          <div className='max-h-[60vh] overflow-y-auto mt-2'>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className='p-2 border rounded mt-2'>
                <input
                  type='text'
                  placeholder='Question'
                  value={question.text}
                  onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                  className='w-full p-2 border rounded'
                />
                {question.answers.map((answer, aIndex) => (
                  <input
                    key={aIndex}
                    type='text'
                    placeholder='Answer'
                    value={answer}
                    onChange={(e) =>
                      updateAnswer(qIndex, aIndex, e.target.value)
                    }
                    className='w-full p-2 border rounded mt-2'
                  />
                ))}
                <Button className='mt-2' onClick={() => addAnswer(qIndex)}>
                  Add Answer
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsQuizDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding quiz...', questions)}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete <b>{selectedSubject?.name}</b>?
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={() => console.log('Deleting subject...')}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Home

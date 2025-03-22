import React, { useContext } from 'react'
import './Students_admin.css'
import manImage4 from '@/assets/images/man-438081_960_720.png'
import manImage41 from '@/assets/images/image (2).png'
import manImage5 from '@/assets/images/More.png'
import manImage6 from '@/assets/images/Ellipse 2755.png'
import { useState } from 'react'
import { Bell } from 'lucide-react'
// import { IoAddOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import manImage2 from '@/assets/images/search.png'

import { FiEdit3 } from 'react-icons/fi'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'

import PieChartComponent from '@/components/ui/PieChartComponent'

import { IoMdCheckmark } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import { BsDashLg } from 'react-icons/bs'
import { FaRegHandPaper } from 'react-icons/fa'
import {
  useGetStudentComplaints,
  useGetStudentDetails,
  useGetStudentMarks,
  useSearchStudents,
} from '@/api/UsersApi'
import { formatDate } from '@/lib/utils'
import Header from '@/components/Header'
import {
  useGetCourses,
  useGetStudentQuizStats,
  useGetTeacherCourses,
} from '@/api/curriculumApi'
import { useEffect } from 'react'
import Loader from '@/components/UI/Loader'
import {
  useGetStudentAttendanceRate,
  useGetStudentLastWeekAttendance,
} from '@/api/attendanceApi'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/UI/dialog'
import { Label } from '@/components/UI/label'
import { Button } from '@/components/UI/button'
import { Context } from '@/store'
import { useEditStudent } from '@/api/UsersApi'
import { SERVER_API } from '@/main'

const SEMESTERS = [1, 2, 3, 4]

const semesters = SEMESTERS.map((sem) => ({ id: sem, name: `Semester ${sem}` }))

function StudentDetails({ studentId }) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const { data: userInfo, isLoading } = useGetStudentDetails(studentId)
  const { data: studentMarks } = useGetStudentMarks(
    studentId,
    selectedSemester?.id
  )
  const { data: complaints } = useGetStudentComplaints(studentId)
  const { data: quizStats } = useGetStudentQuizStats(studentId)
  const { userConfiguration } = useContext(Context)
  const isTeacher = userConfiguration?.role === 'teacher'
  const editStudent = useEditStudent(studentId)
  const { data: studentAttendanceRate } = useGetStudentAttendanceRate(studentId)

  if (!studentId) {
    return (
      <div className='flex flex-col items-center justify-center h-full min-h-[50vh] px-4 mx-auto mt-20'>
        <div className='text-center max-w-md'>
          <div className='mb-6'>
            <svg
              className='w-32 h-32 mx-auto text-blue-400'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
                fill='currentColor'
              />
              <path
                d='M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                d='M18 12H21'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M3 12H6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M12 6V3'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M12 21V18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            No Student Selected
          </h2>
          <p className='text-gray-500 mb-6'>
            Please select a student from the list to view their detailed
            information, academic performance, and attendance records.
          </p>
        </div>
      </div>
    )
  }

  const saveChanges = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      hometown: formData.get('hometown'),
    }

    await editStudent.mutateAsync(data)
    setIsEditing(false)
  }

  return (
    <div className='student-admin-infos student-admin-infos-2 '>
      <div className='content-std flex'>
        <div className='std-info '>
          <div className='st-info-header'>
            <h2>Personal info</h2>
            <Dialog
              open={isEditing}
              onOpenChange={setIsEditing}
              onClose={() => setIsEditing(false)}
            >
              <DialogTrigger>
                <FiEdit3 className='mx-6 my-2 cursor-pointer' />
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={saveChanges}>
                  <DialogHeader>
                    <DialogTitle>Edit Personal Information</DialogTitle>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='fullName' className='text-right'>
                        Full Name
                      </Label>
                      <Input
                        id='fullName'
                        name='fullName'
                        defaultValue={userInfo?.fullName}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='phoneNumber' className='text-right'>
                        Phone Number
                      </Label>
                      <Input
                        id='phoneNumber'
                        name='phoneNumber'
                        defaultValue={userInfo?.phoneNumber}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='email' className='text-right'>
                        Email
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        defaultValue={userInfo?.email}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='hometown' className='text-right'>
                        Hometown
                      </Label>
                      <Input
                        id='hometown'
                        name='hometown'
                        defaultValue={userInfo?.hometown}
                        className='col-span-3'
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type='button' variant='outline'>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type='submit'>Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className='Inpt-infos '>
            <div className='col-12 col-md-6 w-1/2'>
              <div>
                <label htmlFor=''>Full Name</label>
                <div className='information'>{userInfo?.fullName}</div>
              </div>
              <div>
                <label htmlFor=''>Phone number</label>
                <div className='information'>{userInfo?.phoneNumber}</div>
              </div>
              <div>
                <label htmlFor=''>Email</label>
                <div className='information'>{userInfo?.email}</div>
              </div>
            </div>

            <div className='col-12 col-md-6 w-1/2'>
              <div>
                <label htmlFor=''>Course</label>
                <div className='information'>{userInfo?.course}</div>
              </div>

              <div>
                <label htmlFor=''>Student ID</label>
                <div className='information'>{userInfo?.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='infos-supple'>
          <div className='std-info-contain std-info-contain-2'>
            <div className='div-img w-20 h-20 overflow-hidden rounded-full mx-auto'>
              <img
                className='w-full h-full object-cover'
                src={SERVER_API + userInfo?.imageUrl}
                alt=''
              />
            </div>
            <div>
              <h1>{userInfo?.fullName}</h1>
              <p>{userInfo?.email}</p>
            </div>
          </div>
          <div className='hometown hometown-2'>
            <h1>Hometown</h1>
            <div>
              <div className='information'>{userInfo?.hometown}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='Students-stats flex'>
        <div className='Students-stats-1 p-3'>
          <div className='Semestre flex justify-end'>
            <ComboboxDemo
              options={semesters}
              onSelect={setSelectedSemester}
              placeholder='Semestre'
              width='150px'
            />
          </div>
          <div className='stats-details flex  flex-wrap mt-4'>
            {studentMarks?.map((exam) => (
              <div key={exam.id} className='stat-card'>
                <div className='stat-card-header flex justify-between'>
                  <div className='Name-ds'>
                    <h2>{exam.name}</h2>
                    <span>{exam.subject}</span>
                  </div>
                  <div className='Number-exam'>
                    <span>{exam.mark}</span>
                  </div>
                </div>
                <p>
                  {formatDate(exam.date)}
                  {exam.hour ? ` - ${exam.hour}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='Students-stats-2 p-3'>
          <div className='mini-div-2'>
            <h4>Attendance rate</h4>
            <div>
              <ComboboxDemo
                className='comboButton text-lg'
                width='120px'
                placeholder='Subject'
              />
            </div>
          </div>

          <div className='piechart-1 w-10 '>
            <PieChartComponent
              colors={['#F93C65', '#4880FF']}
              width={350}
              height={260}
              data={studentAttendanceRate || []}
            />
          </div>
        </div>
      </div>

      {isTeacher && (
        <div className='Last-part-students flex'>
          <div className='Quizez'>
            <h2>Total Quizes</h2>
            <div className='Totall'>
              <span>
                {quizStats?.totalQuizzes < 10
                  ? `0${quizStats?.totalQuizzes}`
                  : quizStats?.totalQuizzes}
              </span>
            </div>
            <div className='time-quizez flex justify-between'>
              <div className='time-quize'>
                <p className='success'>Success</p>
                <div>
                  <span>
                    {quizStats?.quizzesPassed < 10
                      ? `0${quizStats?.quizzesPassed}`
                      : quizStats?.quizzesPassed}
                  </span>
                </div>
              </div>
              <div className='time-quize'>
                <p className='failed'>Failed</p>
                <div>
                  <span>
                    {quizStats?.quizzesFailed < 10
                      ? `0${quizStats?.quizzesFailed}`
                      : quizStats?.quizzesFailed}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='complaints'>
            <h2> Last Complaints</h2>
            {complaints?.map((complaint) => (
              <div
                key={complaint.id}
                className='Complaints-infos flex justify-between mt-2'
              >
                <div className='reason leading-none'>
                  <p>{complaint.excuse}</p>
                  <span>
                    {complaint.sessionName} - {formatDate(complaint.date)}
                  </span>
                </div>
                <div className='icons-reason flex'>
                  <IoMdCheckmark className='fill-green-500 cursor-pointer mr-1' />
                  <FaRegHandPaper className='fill-red-500 cursor-pointer' />
                </div>
              </div>
            ))}
          </div>

          <WeekPresenceTable />
        </div>
      )}
    </div>
  )
}

function Students() {
  const { userConfiguration } = useContext(Context)
  const { studentId } = useParams()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { data: courses } = useGetCourses(1, userConfiguration.role)
  const { isLoading } = useGetStudentDetails(studentId)

  return (
    <>
      <Header />

      <div className='title'>
        <h3> Students </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>
      <div className='flex justify-end'>
        <ComboboxDemo
          onSelect={setSelectedCourse}
          options={courses}
          placeholder='Course'
          width='150px'
        />
      </div>
      <div className='students-admin-principal'>
        <StudentsList courseId={selectedCourse?.id} />

        {isLoading ? (
          <Loader className='h-full ml-auto mr-auto mt-48' />
        ) : (
          <StudentDetails studentId={studentId} />
        )}
      </div>
    </>
  )
}

const WeekPresenceTable = () => {
  const { studentId } = useParams()
  const { data: weekData } = useGetStudentLastWeekAttendance(studentId)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <IoMdCheckmark />
      case 'absent':
        return <RxCross1 />
      default:
        return <BsDashLg />
    }
  }

  return (
    <div className='last-weeek'>
      <h2>Last week</h2>
      <table className='table-last-weeek'>
        <tr>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
        <tr>
          {days.map((day) => (
            <td key={day}>
              <div className='div-last'>
                {getStatusIcon(weekData?.[day.toLowerCase()])}
              </div>
            </td>
          ))}
        </tr>
      </table>
    </div>
  )
}

const StudentsList = ({ courseId, onSelect }) => {
  const { studentId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { data: students } = useSearchStudents(debouncedSearchTerm, courseId)

  console.log('The student id..........', studentId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className='students-admin'>
      <div className='relative'>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder='Search student'
          className='w-60 my-7'
        />
        <img
          className='sear-img sear-img-2 top-2 left-3'
          src={manImage2}
          alt=''
        />
      </div>
      <ul>
        {students?.map((student) => (
          <li
            key={student.id}
            className={`student-name rounded-sm ${
              student.id === +studentId ? 'bg-[#E2E2E2] border-none' : ''
            } hover:bg-[#E2E2E2]`}
          >
            <Link className='flex w-full' to={`/students/${student.id}`}>
              <div className='w-9 h-9 rounded-full overflow-hidden'>
                <img
                  className='w-full h-full object-cover'
                  src={SERVER_API + student?.imageUrl}
                  alt=''
                />
              </div>
              <div className='name ml-2'>
                <span className='span-1'>{student.name}</span>
                <span className='text-[#454545] text-xs'>{student.course}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className='student-name hover:bg-[#EEEEEE]'>
        <div>
          <img src={manImage6} alt='' />
        </div>
        <div className='name'>
          <span className='span-1'>Mohammed Izourne</span>
          <span className='text-[#454545] text-xs'>GI 1</span>
        </div>
      </div>

      <div className='student-name hover:bg-[#EEEEEE]'>
        <div>
          <img src={manImage6} alt='' />
        </div>
        <div className='name'>
          <span className='span-1'>Mohammed Izourne</span>
          <span className='text-[#454545] text-xs'>GI 1</span>
        </div>
      </div>

      <div className='student-name hover:bg-[#EEEEEE]'>
        <div>
          <img src={manImage6} alt='' />
        </div>
        <div className='name'>
          <span className='span-1'>Mohammed Izourne</span>
          <span className='text-[#454545] text-xs'>GI 1</span>
        </div>
      </div>

      <div className='student-name hover:bg-[#EEEEEE]'>
        <div>
          <img src={manImage6} alt='' />
        </div>
        <div className='name'>
          <span className='span-1'>Mohammed Izourne</span>
          <span className='text-[#454545] text-xs'>GI 1</span>
        </div>
      </div> */}
    </div>
  )
}

export default Students

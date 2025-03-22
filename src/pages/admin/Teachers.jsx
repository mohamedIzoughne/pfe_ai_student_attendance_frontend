import './Teachers.css'
import manImage4 from '@/assets/images/man-438081_960_720.png'
import manImage41 from '@/assets/images/image (2).png'
import manImage5 from '@/assets/images/More.png'
import manImage6 from '@/assets/images/Ellipse 2755.png'
import { useState } from 'react'
import { Bell } from 'lucide-react'
import { IoAddOutline } from 'react-icons/io5'

import { Input } from '@/components/ui/input'
import manImage2 from '@/assets/images/search.png'

import { FiEdit3 } from 'react-icons/fi'
import Header from '@/components/Header'
import { useSearchTeachers, useGetTeacherDetails } from '@/api/UsersApi'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AdminSchedule from '@/components/admin/AdminSchedule'
import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEditTeacher } from '@/api/UsersApi'

import { SERVER_API } from '@/main'

const TeachersList = () => {
  const { teacherId } = useParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const { data: teachers } = useSearchTeachers(debouncedSearch, 1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div className='students-admin'>
      <div className=' relative'>
        <Input
          className='w-60 my-7'
          placeholder='Search teacher'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img className='sear-img left-3 top-2' src={manImage2} alt='' />
      </div>
      <ul>
        {teachers?.map((teacher) => (
          <li
            key={teacher.id}
            className={`student-name rounded-sm ${
              teacher.id === +teacherId ? 'bg-[#E2E2E2] border-none' : ''
            } hover:bg-[#E2E2E2]`}
          >
            <Link className='flex w-full' to={`/teachers/${teacher.id}`}>
              <div className='w-9 h-9 rounded-full overflow-hidden'>
                <img
                  className='w-full h-full object-cover'
                  src={SERVER_API + teacher?.imageUrl}
                  alt=''
                />
              </div>
              <div className='name ml-2'>
                <span className='span-1'>{teacher.name}</span>
                <span className='text-[#454545] text-xs'>
                  {teacher.degree || '----'}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>{' '}
    </div>
  )
}

const TeachersDetails = () => {
  const { teacherId } = useParams()
  const { data: teacherDetails } = useGetTeacherDetails(teacherId)
  const editTeacher = useEditTeacher(teacherId)
  const [formData, setFormData] = useState({
    name: teacherDetails?.name,
    phoneNumber: teacherDetails?.phoneNumber,
    degree: teacherDetails?.degree,
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFormData({
      name: teacherDetails?.name,
      phoneNumber: teacherDetails?.phoneNumber,
      degree: teacherDetails?.degree,
    })
  }, [teacherDetails])

  const handleSubmit = (e) => {
    e.preventDefault()
    editTeacher.mutate(formData)
    setOpen(false)
  }

  if (!teacherId) {
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
            No Teacher Selected
          </h2>
          <p className='text-gray-500 mb-6'>
            Please select a teacher from the list to view their detailed
            information and their schedule.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='student-admin-infos'>
      <div className='std-info'>
        <div className='st-info-header'>
          <h2>Personal info</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <FiEdit3 className='mx-6 my-2 cursor-pointer' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Teacher Information</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label>Name</label>
                  <Input
                    defaultValue={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <Input
                    defaultValue={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    defaultValue={formData.degree}
                    onChange={(e) =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                  />
                </div>
                <Button type='submit'>Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='Inpt-infos '>
          <div className='col-12 col-md-6 w-1/2'>
            <div>
              <label htmlFor=''>Full Name</label>
              <div className='information'>{teacherDetails?.name}</div>
            </div>
            <div>
              <label htmlFor=''>Phone number</label>
              <div className='information'>{teacherDetails?.phoneNumber}</div>
            </div>
            <div>
              <label htmlFor=''>Email</label>
              <div className='information'>{teacherDetails?.email}</div>
            </div>
          </div>

          <div className='col-12 col-md-6 w-1/2'>
            <div>
              <label htmlFor=''>Number of subjects</label>
              <div className='information'>{teacherDetails?.subjectsCount}</div>
            </div>

            <div>
              <label htmlFor=''>Teacher ID</label>
              <div className='information'>{teacherDetails?.id}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='infos-supple'>
        <div className='std-info-contain'>
          <div className='div-img w-20 h-20 overflow-hidden rounded-full mx-auto'>
            <img
              className='w-full h-full object-cover'
              src={SERVER_API + teacherDetails?.imageUrl}
              alt=''
            />
          </div>

          <div>
            <h1>{teacherDetails?.name}</h1>
            <p>{teacherDetails?.email}</p>
          </div>
        </div>
        <div className='hometown'>
          <h1>Degree</h1>
          <div>
            <div className='information'>
              {teacherDetails?.degree || '-------'}
            </div>
          </div>
        </div>
      </div>
      <AdminSchedule />
    </div>
  )
}

function Teachers() {
  return (
    <>
      <Header />

      <div className='title'>
        <h3> Teachers </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='students-admin-principal'>
        <TeachersList />

        <TeachersDetails />
      </div>
    </>
  )
}

export default Teachers

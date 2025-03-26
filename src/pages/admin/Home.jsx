import { useState } from 'react'
import { Bell } from 'lucide-react'
import '../Students.css'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'

import manImage4 from '@/assets/images/man-438081_960_720.png'
import manImage5 from '@/assets/images/More.png'
import manImage6 from '@/assets/images/Icon.png'
import manImage10 from '@/assets/images/Icon (5).png'
import manImage11 from '@/assets/images/Icon (6).png'

import PieChartComponent from '@/components/ui/PieChartComponent'
import Barchart from '@/components/UI/StackBarchart'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { IoAddOutline } from 'react-icons/io5'

import { useGetAdminDashboardData, useGetGenderData } from '@/api/UsersApi'
import {
  useCreateRoom,
  useRemoveRoom,
  useGetRooms,
  useRemoveField,
  useGetFields,
  useAddField,
} from '@/api/curriculumApi'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import CourseAttendanceSummaryChart from '@/components/admin/courseAttendanceSummaryChart'
import WeeklyAttendanceChart from '@/components/admin/WeeklyAttendanceChart'
import StudentsPieChartComponent from '@/components/admin/StudentsGenderPieChart'
import Header from '@/components/Header'

import { useRemoveExam, useRemoveQuiz } from '@/api/curriculumApi'
// NotificationSection.jsx
// function NotificationSection({ notifications, handleNotificationClick }) {
//   return (
//     <div className='div0'>
//       <div className='notification-container' onClick={handleNotificationClick}>
//         <Bell className='notification-icon' size={30} color='#4880FF' />
//         {notifications > 0 && <span className='notification-badge'>{notifications}</span>}
//       </div>
//       <img className='img2' src={manImage4} alt='' />
//       <div className='mini-div'>
//         <span>Moni Roy</span>
//         <h4>Teacher</h4>
//       </div>
//       <img className='img3' src={manImage5} alt='' />
//     </div>
//   )
// }

// StatsSection.jsx
function StatsSection({ dashboardStats }) {
  return (
    <div className='container'>
      <div className='div1 div1-ad'>
        <div>
          <h3>Total Students</h3>
          <span>{dashboardStats.totalStudents}</span>
        </div>
        <img src={manImage6} alt='' />
      </div>
      <div className='div1 div1-ad'>
        <div>
          <h3>Total teachers</h3>
          <span>{dashboardStats.totalTeachers}</span>
        </div>
        <img src={manImage10} alt='' />
      </div>
      <div className='div1 div1-ad'>
        <div>
          <h3>Total Classes</h3>
          <span>{dashboardStats.totalCourses}</span>
        </div>
        <img src={manImage11} alt='' />
      </div>
    </div>
  )
}

// ClassroomSection.jsx
function ClassroomSection({ rooms, setDialogType, setSelectedItem }) {
  return (
    <div className='main-end-part main-end-part-ad'>
      <div>
        <h3>Classrooms</h3>
      </div>
      <div className='ad-add'>
        {rooms?.map((room) => (
          <TooltipProvider key={room.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className='p-2 bg-gray-200 rounded-lg'
                  onClick={() => {
                    setDialogType('deleteRoom')
                    setSelectedItem(room)
                  }}
                >
                  {room.name}
                </button>
              </TooltipTrigger>
              <TooltipContent className='bg-white'>
                <p>Capacity: {room.capacity}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <button
          className='p-2 bg-blue-100 rounded-lg'
          onClick={() => setDialogType('classroom')}
        >
          <IoAddOutline className='stroke-[#8A8A8A] mx-6 size-6 Add-Button' />
        </button>
      </div>
    </div>
  )
}

// ProgramSection.jsx
function ProgramSection({ fields, setDialogType, setSelectedItem }) {
  return (
    <div className='main-end-part main-end-part-ad'>
      <div>
        <h3>Programs</h3>
      </div>
      <div className='ad-add'>
        {fields?.map((field) => (
          <button
            key={field.id}
            className='p-2 bg-gray-200 rounded-lg'
            onClick={() => {
              setDialogType('deleteProgram')
              setSelectedItem(field)
            }}
          >
            {field.name}
          </button>
        ))}
        <button
          className='p-2 bg-blue-100 rounded-lg'
          onClick={() => setDialogType('program')}
        >
          <IoAddOutline className='stroke-[#8A8A8A] mx-6 size-6 Add-Button' />
        </button>
      </div>
    </div>
  )
}

function SubjectSection({ subjects, setDialogType, setSelectedItem }) {
  return (
    <div className='main-end-part main-end-part-ad'>
      <div>
        <h3>Programs</h3>
      </div>
      <div className='ad-add'>
        {subjects?.map((subject) => (
          <button
            key={subject.id}
            className='p-2 bg-gray-200 rounded-lg'
            onClick={() => {
              setDialogType('deleteSubject')
              setSelectedItem(subject)
            }}
          >
            {subject.name}
          </button>
        ))}
        <button
          className='p-2 bg-blue-100 rounded-lg'
          onClick={() => setDialogType('subject')}
        >
          <IoAddOutline className='stroke-[#8A8A8A] mx-6 size-6 Add-Button' />
        </button>
      </div>
    </div>
  )
}

// AddDialog.jsx
function AddDialog({
  dialogType,
  setDialogType,
  newRoom,
  setNewRoom,
  handleSubmit,
}) {
  return (
    <Dialog
      open={dialogType === 'classroom' || dialogType === 'program'}
      onOpenChange={() => setDialogType(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ajouter {dialogType === 'classroom' ? 'une salle' : 'un programme'}
          </DialogTitle>
          <DialogDescription>
            {dialogType === 'classroom'
              ? 'Entrez le nom et la capacité de la salle'
              : 'Entrez le nom du programme'}{' '}
            que vous souhaitez ajouter.
          </DialogDescription>
        </DialogHeader>
        {dialogType === 'classroom' ? (
          <>
            <Input
              type='text'
              placeholder='Nom de la salle'
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            />
            <Input
              type='number'
              placeholder='Capacité de la salle'
              value={newRoom.capacity}
              onChange={(e) =>
                setNewRoom({ ...newRoom, capacity: e.target.value })
              }
            />
          </>
        ) : (
          <Input
            type='text'
            placeholder='Nom du programme'
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
        )}
        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setDialogType(null)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// DeleteDialog.jsx
function DeleteDialog({
  dialogType,
  setDialogType,
  setSelectedItem,
  handleDelete,
}) {
  return (
    <Dialog
      open={
        dialogType === 'deleteRoom' ||
        dialogType === 'deleteProgram' ||
        dialogType === 'deleteExam' ||
        dialogType === 'deleteQuiz'
      }
      onOpenChange={() => {
        setDialogType(null)
        setSelectedItem(null)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this{' '}
            {dialogType === 'deleteRoom'
              ? 'room'
              : dialogType === 'deleteProgram'
              ? 'program'
              : dialogType === 'deleteExam'
              ? 'exam'
              : 'quiz'}
            ?
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              setDialogType(null)
              setSelectedItem(null)
            }}
          >
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Home.jsx
function Home() {
  // const [notifications, setNotifications] = useState(6)
  const [newRoom, setNewRoom] = useState({ name: '', capacity: '' })
  const [dialogType, setDialogType] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const { data: dashboardStats = {} } = useGetAdminDashboardData(1)
  const { data: rooms } = useGetRooms(1)
  const { data: fields } = useGetFields(1)

  const createRoom = useCreateRoom()
  const removeRoom = useRemoveRoom()
  const addField = useAddField()
  const removeField = useRemoveField()
  const removeExam = useRemoveExam()
  const removeQuiz = useRemoveQuiz()

  const handleSubmit = async () => {
    if (newRoom.name.trim() === '') return

    if (dialogType === 'classroom') {
      await createRoom.mutateAsync({
        name: newRoom.name,
        capacity: parseInt(newRoom.capacity),
        schoolId: 1,
      })
    } else if (dialogType === 'program') {
      await addField.mutateAsync({
        name: newRoom.name,
        schoolId: 1,
      })
    }

    setNewRoom({ name: '', capacity: '' })
    setDialogType(null)
  }

  const handleDelete = async () => {
    if (dialogType === 'deleteRoom') {
      await removeRoom.mutateAsync(selectedItem.id)
    } else if (dialogType === 'deleteProgram') {
      await removeField.mutateAsync(selectedItem.id)
    } else if (dialogType === 'deleteExam') {
      await removeExam.mutateAsync(selectedItem.id)
    } else if (dialogType === 'deleteQuiz') {
      await removeQuiz.mutateAsync(selectedItem.id)
    }
    setDialogType(null)
    setSelectedItem(null)
  }

  return (
    <>
      <Header />

      <StatsSection dashboardStats={dashboardStats} />

      <div className='container-2 container-2-ad'>
        <StudentsPieChartComponent />
        <WeeklyAttendanceChart />
      </div>

      <div className='partie-barchart-principal'>
        <CourseAttendanceSummaryChart />

        <div className='end-part end-part-admin'>
          <h2>Academics</h2>

          <ClassroomSection
            rooms={rooms}
            setDialogType={setDialogType}
            setSelectedItem={setSelectedItem}
          />

          <ProgramSection
            fields={fields}
            setDialogType={setDialogType}
            setSelectedItem={setSelectedItem}
          />

          {/* <SubjectSection
            fields={fields}
            setDialogType={setDialogType}
            setSelectedItem={setSelectedItem}
          /> */}
        </div>

        <AddDialog
          dialogType={dialogType}
          setDialogType={setDialogType}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          handleSubmit={handleSubmit}
        />

        <DeleteDialog
          dialogType={dialogType}
          setDialogType={setDialogType}
          setSelectedItem={setSelectedItem}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default Home

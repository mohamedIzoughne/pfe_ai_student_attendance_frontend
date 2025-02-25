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
import Example from '@/components/ui/LineChart'
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

function Students() {
  const [notifications, setNotifications] = useState(6)
  const [newItem, setNewItem] = useState('')
  const [dialogType, setDialogType] = useState(null)

  // ✅ Ajouter un state pour stocker les salles et programmes
  const [classrooms, setClassrooms] = useState([
    'Salle 01',
    'Amphi 1',
    'Amphi 2',
    'Amphi 3',
  ])
  const [programs, setPrograms] = useState(['GI', 'GE', 'TM', 'GBI'])

  const frameworksList = [
    { value: "girl", label: "girl" },
    { value: "men", label: "men" },
  ];

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0)
    }
  }

  // ✅ Ajouter dynamiquement la salle ou le programme
  const handleSubmit = () => {
    if (newItem.trim() === '') return

    if (dialogType === 'classroom') {
      setClassrooms([...classrooms, newItem]) // Ajoute une salle
    } else if (dialogType === 'program') {
      setPrograms([...programs, newItem]) // Ajoute un programme
    }

    setNewItem('')
    setDialogType(null) // Ferme le dialog
  }

  return (
    <>
      {/* Notification */}
      <div className='div0'>
        <div
          className='notification-container'
          onClick={handleNotificationClick}
        >
          <Bell className='notification-icon' size={30} color='#4880FF' />
          {notifications > 0 && (
            <span className='notification-badge'>{notifications}</span>
          )}
        </div>
        <img className='img2' src={manImage4} alt='' />
        <div className='mini-div'>
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className='img3' src={manImage5} alt='' />
      </div>

      {/* Stats Section */}
      <div className='container'>
        <div className='div1 div1-ad'>
          <div>
            <h3>Total Students</h3>
            <span>356</span>
          </div>
          <img src={manImage6} alt='' />
        </div>
        <div className='div1 div1-ad'>
          <div>
            <h3>Total teachers</h3>
            <span>10</span>
          </div>
          <img src={manImage10} alt='' />
        </div>
        <div className='div1 div1-ad'>
          <div>
            <h3>Total Classes</h3>
            <span>40</span>
          </div>
          <img src={manImage11} alt='' />
        </div>
      </div>

      {/* Charts Section */}
      <div className='container-2 container-2-ad'>
        <div className='div2 div2-ad'>
          <div className='mini-div-2'>
            <h4 className='h4-2'>Total Students by Gender</h4>
            <div>
              <ComboboxDemo placeholder="class" className='comboButton' width='105px' options={frameworksList} />
            </div>
          </div>
          <div className='piechart-1 piechart-1-ad'>
            <PieChartComponent width={300} height={300}/>
          </div>
        </div>

        <div className='div2-2'>
          <div className='mini-div-2'>
            <h4>Weekly Attendance</h4>
            <div className='comboButton'>
              <ComboboxDemo placeholder='class' width='120px' />
              {/* <ComboboxDemo width='100px' /> */}
            </div>
          </div>
          <div className='piechart-1'>
            <Example />
          </div>
        </div>
      </div>

      {/* Class Attendance Summary */}
      <div className='partie-barchart-principal'>
        <div className='partie-barchart'>
          <div className='title-barchart'>
            <h2>Class Attendance Summary</h2>
            <div>
              <ComboboxDemo placeholder='This week' width='130px' />
            </div>
          </div>
          <Barchart />
        </div>

        {/* Academics Section */}
        <div className='end-part end-part-admin'>
          <h2>Academics</h2>

          {/* Classrooms */}
          <div className='main-end-part main-end-part-ad'>
            <div>
              <h3>Classrooms</h3>
            </div>
            <div className='ad-add'>
              {classrooms.map((room, index) => (
                <button key={index} className='p-2 bg-gray-200 rounded-lg'>
                  {room}
                </button>
              ))}

              {/* Ajouter une salle */}
              <button
                className='p-2 bg-blue-100 rounded-lg'
                onClick={() => setDialogType('classroom')}
              >
                <IoAddOutline className='stroke-[#8A8A8A] mx-6 size-6 Add-Button' />
              </button>
            </div>
          </div>

          {/* Programs */}
          <div className='main-end-part main-end-part-ad'>
            <div>
              <h3>Programs</h3>
            </div>
            <div className='ad-add'>
              {programs.map((program, index) => (
                <button key={index} className='p-2 bg-gray-200 rounded-lg'>
                  {program}
                </button>
              ))}

              {/* Ajouter un programme */}
              <button
                className='p-2 bg-blue-100 rounded-lg'
                onClick={() => setDialogType('program')}
              >
                <IoAddOutline className='stroke-[#8A8A8A] mx-6 size-6 Add-Button' />
              </button>
            </div>
          </div>
        </div>

        {/* Dialog pour ajouter une salle ou un programme */}
        <Dialog
          open={dialogType !== null}
          onOpenChange={() => setDialogType(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Ajouter{' '}
                {dialogType === 'classroom' ? 'une salle' : 'un programme'}
              </DialogTitle>
              <DialogDescription>
                Entrez le nom de{' '}
                {dialogType === 'classroom' ? 'la salle' : 'du programme'} que
                vous souhaitez ajouter.
              </DialogDescription>
            </DialogHeader>
            <Input
              type='text'
              placeholder={
                dialogType === 'classroom'
                  ? 'Nom de la salle'
                  : 'Nom du programme'
              }
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <div className='flex justify-end gap-2'>
              <Button variant='outline' onClick={() => setDialogType(null)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default Students

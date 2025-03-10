import './Complaints.css'

import { Input } from '@/components/ui/input'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'
import { Bell } from 'lucide-react'
import { useState } from 'react'

import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'
import manImage2 from '@/assets/images/search.png'

import { IoHandLeftOutline } from 'react-icons/io5'
import { IoMdCheckmark } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { CiExport } from 'react-icons/ci'
import { PiDownloadSimple } from 'react-icons/pi'
import React, { useRef } from 'react'
import manImage3 from '@/assets/images/WhatsApp Image 2025-02-11 à 23.37.14_feef5af2.jpg'

import Header from '@/components/Header'
import {
  useGetCourses,
  useGetSessions,
  useGetTeacherCourses,
} from '@/api/curriculumApi'
import {
  useGetComplaints,
  useRefuseComplaint,
  useAcceptComplaint,
} from '@/api/attendanceApi'
import { formatDateWithoutYear } from '@/lib/utils'

import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from '@/components/ui/dialog'
import { useEffect } from 'react'

const Complaints = () => {
  const { data: courses } = useGetTeacherCourses(1)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [selectedSession, setSelectedSession] = useState({})
  const { data: sessions } = useGetSessions(selectedCourse?.id)
  const { data: complaints } = useGetComplaints(
    1,
    selectedSession?.id,
    selectedCourse?.id
  )
  const { mutate: refuseComplaint } = useRefuseComplaint()
  const { mutate: acceptComplaint } = useAcceptComplaint()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const [complaintToRefuse, setComplaintToRefuse] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredComplaints = React.useMemo(() => {
    return complaints?.filter((complaint) =>
      complaint.studentName
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    )
  }, [complaints, debouncedSearchTerm])

  return (
    <>
      <Header />

      <div className='title'>
        <h3> Complaints </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center'>
        <div>
          <Input
            placeholder='Search Student name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={manImage2} alt='' />
        </div>

        <div className='mini-div-center'>
          <div>
            <ComboboxDemo
              onSelect={setSelectedCourse}
              options={courses}
              placeholder='Course'
              width='100px'
            />
          </div>
          <div>
            <ComboboxDemo
              onSelect={setSelectedSession}
              options={sessions}
              placeholder='Session'
              width='120px'
            />
          </div>
        </div>
      </div>

      <table className='complaints-table'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Excuse</th>
            <th>Session</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints?.map((complaint) => (
            <tr key={complaint.id}>
              <td className='std-idd'>{complaint.studentId}</td>
              <td className='std-namee'>{complaint.studentName}</td>
              <td className='execuse'>{complaint.excuse}</td>
              <td className='sessionn'>
                {complaint.sessionName} -{' '}
                {complaint?.date && formatDateWithoutYear(complaint.date)}
              </td>
              <td>
                <div className='icons-reason flex justify-center align-middle'>
                  <button onClick={() => acceptComplaint(complaint.id)}>
                    <IoMdCheckmark className='fill-green-500 mr-2' />
                  </button>
                  <button onClick={() => setComplaintToRefuse(complaint)}>
                    <IoHandLeftOutline className='stroke-[red]' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {complaintToRefuse && (
        <Dialog
          open={!!complaintToRefuse}
          onOpenChange={() => setComplaintToRefuse(null)}
        >
          <DialogContent>
            <DialogHeader>
              <h2 className='text-lg font-semibold'>Confirm Refusal</h2>
              <p>
                Are you sure you want to refuse the complaint from{' '}
                <strong>{complaintToRefuse.studentName}</strong>?
              </p>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setComplaintToRefuse(null)}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={() => {
                  refuseComplaint(complaintToRefuse.id)
                  setComplaintToRefuse(null)
                }}
              >
                Yes, Refuse
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
export default Complaints

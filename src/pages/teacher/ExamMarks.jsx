// import "./Complaints.css";

import './Students_marks.css'

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
import { useRef } from 'react'
import manImage3 from '@/assets/images/WhatsApp Image 2025-02-11 à 23.37.14_feef5af2.jpg'
import Header from '@/components/Header'
import { useParams } from 'react-router-dom'
import {
  useGetExamMarks,
  useAddMark,
  useImportMarks,
  useExportMarks,
} from '@/api/curriculumApi'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useUpdateMarkNotes } from '@/api/curriculumApi'

const ExamMarks = () => {
  const fileInputRef = useRef(null)
  const { examId } = useParams()

  const { data: examMarks } = useGetExamMarks(examId)
  const { mutate: addMark } = useAddMark()
  const { mutate: importMarks } = useImportMarks()
  const { refetch: exportMarks } = useExportMarks(examId)
  const { mutate: updateNotes } = useUpdateMarkNotes()
  const [studentStatus, setStudentStatus] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [open, setOpen] = useState(false)
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleButtonClick = () => {
    exportMarks()
  }

  const handleAddMark = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    addMark({
      examId,
      studentId: formData.get('studentId'),
      mark: Number(formData.get('mark')),
      notes: formData.get('notes'),
    })
    setOpen(false)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      importMarks({ examId, file: selectedFile })
    }
  }

  const handleUpdateNotes = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    updateNotes({
      examId,
      studentId: selectedStudent.studentId,
      notes: formData.get('notes'),
    })
    setNotesDialogOpen(false)
  }

  const sortedMarks = () => {
    if (!examMarks) return []
    let sorted = [...examMarks]
    if (sortBy?.name === 'ID') {
      sorted.sort((a, b) => Number(a.studentId) - Number(b.studentId))
    } else if (sortBy?.name === 'Mark') {
      sorted.sort((a, b) => a.mark - b.mark)
    } else if (sortBy?.name === 'ID Desc') {
      sorted.sort((a, b) => Number(b.studentId) - Number(a.studentId))
    } else if (sortBy?.name === 'Mark Desc') {
      sorted.sort((a, b) => b.mark - a.mark)
    }
    return sorted
  }
  return (
    <>
      <Header />

      <div className='title'>
        <h3> Students marks </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center'>
        <div>
          <Input placeholder='Search Student name or id' />
          <img src={manImage2} alt='' />
        </div>

        <div className='mini-div-center'>
          <div>
            <ComboboxDemo
              options={[
                { id: 1, name: 'ID' },
                { id: 2, name: 'Mark' },
                { id: 2, name: 'ID Desc' },
                { id: 2, name: 'Mark Desc' },
              ]}
              onSelect={setSortBy}
              placeholder='Sort by'
              width='122px'
            />
          </div>
          <div>
            <ComboboxDemo
              options={[
                { id: 1, name: 'Passed' },
                { id: 2, name: 'Failed' },
              ]}
              onSelect={setStudentStatus}
              placeholder='Status'
              width='124px'
            />
          </div>
          <div>
            <Button
              variant='outline'
              className='flex'
              onClick={handleButtonClick}
            >
              Export
              <CiExport />
            </Button>
          </div>
          <div>
            <Button
              variant='outline'
              onClick={() => fileInputRef.current.click()}
            >
              Import
              <PiDownloadSimple />
            </Button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
              accept='.xlsx,.xls'
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className='btn1'>+</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Mark</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMark} className='space-y-4'>
                <div>
                  <Label htmlFor='studentId'>Student ID</Label>
                  <Input required id='studentId' name='studentId' />
                </div>
                <div>
                  <Label htmlFor='mark'>Mark</Label>
                  <Input
                    required
                    type='number'
                    min='0'
                    max='20'
                    step='0.25'
                    id='mark'
                    name='mark'
                  />
                </div>
                <div>
                  <Label htmlFor='notes'>Notes (Optional)</Label>
                  <Input id='notes' name='notes' />
                </div>
                <Button type='submit'>Add Mark</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Notes</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateNotes} className='space-y-4'>
            <div>
              <Label htmlFor='notes'>Notes</Label>
              <Input
                id='notes'
                name='notes'
                defaultValue={selectedStudent?.notes || ''}
              />
            </div>
            <Button type='submit'>Update Notes</Button>
          </form>
        </DialogContent>
      </Dialog>

      <table className='Marks-table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Student name</th>
            <th>Student ID</th>
            <th>Mark</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sortedMarks()
            .filter((mark) =>
              !studentStatus
                ? true
                : studentStatus.id === 1
                ? mark.mark >= 12
                : mark.mark < 12
            )
            .map((mark) => (
              <tr key={mark.studentId}>
                <td>
                  <div>
                    <img src={mark.studentImage || manImage3} alt='' />
                  </div>
                </td>
                <td className='Name-mark'>{mark.studentName}</td>
                <td className='id-mark'>{mark.studentId}</td>
                <td className='mark'>{mark.mark}</td>
                <td
                  className={
                    mark.notes ? 'mark-notes stroke-[#434343]' : 'notes'
                  }
                  onClick={() => {
                    setSelectedStudent(mark)
                    setNotesDialogOpen(true)
                  }}
                >
                  {mark.notes || (
                    <button className='opacity-0 hover:opacity-100 duration-100 transition-all'>
                      + Notes
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default ExamMarks

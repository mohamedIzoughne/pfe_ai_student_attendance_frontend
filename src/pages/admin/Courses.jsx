import React from 'react'

import { Bell, Pointer } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'
import manImage2 from '@/assets/images/search.png'

import { RiDeleteBinLine } from 'react-icons/ri'
import { FiEdit3 } from 'react-icons/fi'
import './Courses.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Header from '@/components/Header'
import {
  useGetCoursesDetails,
  useGetTeachers,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from '@/api/curriculumApi'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/UI/select'

const Courses = () => {
  const { data: courses } = useGetCoursesDetails(1)
  const { data: teachers } = useGetTeachers(1)
  const [editingCourse, setEditingCourse] = useState(null)
  const [open, setOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    grade: '',
    capacity: '',
    supervisorId: '',
    fieldId: 1,
  })

  const createCourseMutation = useCreateCourse()
  const updateCourseMutation = useUpdateCourse()
  const deleteCourseMutation = useDeleteCourse()

  const handleAdd = () => {
    createCourseMutation.mutate(newCourse)
    setNewCourse({ name: '', grade: '', capacity: '', supervisorId: '', fieldId: 1 })
    setAddOpen(false)
  }

  const handleEdit = () => {
    updateCourseMutation.mutate({
      courseId: editingCourse.id,
      courseData: {
        name: editingCourse.name,
        grade: editingCourse.grade,
        capacity: editingCourse.capacity,
        supervisorId: editingCourse.supervisorId,
        fieldId: editingCourse.fieldId || 1,
      },
    })
    setEditingCourse(null)
    setOpen(false)
  }

  const handleDelete = (courseId) => {
    deleteCourseMutation.mutate(courseId)
  }

  return (
    <>
      <Header />

      <div className='title'>
        <h3> Courses </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center items-center'>
        <div>
          <Input placeholder='Search Student name' />
          <img src={manImage2} alt='' />
        </div>

        <div className='mini-div-center mini-div-center-2'>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <button className='btn1'>+</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Class Name</Label>
                  <Input
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Grade</Label>
                  <Input
                    value={newCourse.grade}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, grade: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Capacity</Label>
                  <Input
                    value={newCourse.capacity}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, capacity: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Supervisor</Label>
                  <Select
                    value={newCourse.supervisorId}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, supervisorId: value })
                    }
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select a teacher' />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers?.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAdd}>Add Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <table className='table-admin'>
        <tr>
          <th className='rounded-tl-xl'>Class name</th>
          <th>Grade</th>
          <th>Capacity</th>
          <th>Supervisor</th>
          <th className='rounded-tr-xl'>Actions</th>
        </tr>
        {courses?.map((course, index) => (
          <tr
            key={course.id}
            className={index === courses.length - 1 ? 'last-row' : ''}
          >
            <td className='Classs'>{course.name}</td>
            <td className='Gradee'>{course.grade}</td>
            <td className='Capa'>{course.capacity}</td>
            <td className='superv'>{course.supervisor}</td>
            <td>
              <div className='icons-admin flex justify-center align-middle'>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className='p-2 pr-1'>
                      <FiEdit3
                        size={20}
                        className='stroke-[#797979]'
                        onClick={() => setEditingCourse({ ...course })}
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Class Name</Label>
                        <Input
                          value={editingCourse?.name || ''}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              name: e.target.value,
                            })
                          }
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Grade</Label>
                        <Input
                          value={editingCourse?.grade || ''}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              grade: e.target.value,
                            })
                          }
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Capacity</Label>
                        <Input
                          value={editingCourse?.capacity || ''}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              capacity: e.target.value,
                            })
                          }
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Supervisor</Label>
                        <Select
                          value={editingCourse?.supervisorId || ''}
                          onValueChange={(value) =>
                            setEditingCourse({
                              ...editingCourse,
                              supervisorId: value,
                            })
                          }
                        >
                          <SelectTrigger className='col-span-3'>
                            <SelectValue placeholder='Select a teacher' />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers?.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleEdit}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className='p-2 pl-1'>
                      <RiDeleteBinLine className='fill-[#797979]' size={20} />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Course</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this course? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant='destructive'
                        onClick={() => handleDelete(course.id)}
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
      </table>
    </>
  )
}
export default Courses

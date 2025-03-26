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
  useGetFields,
} from '@/api/curriculumApi'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/UI/select'
import { ComboboxDemo } from '@/components/UI/ComboboxDemo'

const Courses = () => {
  const { data: courses } = useGetCoursesDetails(1)
  const { data: teachers } = useGetTeachers(1)
  const [editingCourse, setEditingCourse] = useState(null)
  const [open, setOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])
  const [newCourse, setNewCourse] = useState({
    name: '',
    grade: '',
    capacity: '',
    supervisorId: '',
    fieldId: 1,
    description: '',
  })
  const { data: fields } = useGetFields(1)

  const createCourseMutation = useCreateCourse()
  const updateCourseMutation = useUpdateCourse()
  const deleteCourseMutation = useDeleteCourse()

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered =
        courses?.filter((course) =>
          course?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
      setFilteredCourses(filtered)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, courses])

  const handleAdd = () => {
    createCourseMutation.mutate(newCourse)
    setNewCourse({
      name: '',
      grade: '',
      capacity: '',
      supervisorId: '',
      fieldId: 1,
      description: '',
    })
    setAddOpen(false)
  }

  const handleEdit = () => {
    updateCourseMutation.mutate({
      courseId: editingCourse.id,
      courseData: {
        name: editingCourse.name,
        grade: editingCourse.grade,
        capacity: editingCourse.capacity,
        supervisorId: editingCourse?.supervisor?.id,
        description: editingCourse.description,
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
        <h3> Classes </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center items-center'>
        <div>
          <Input
            placeholder='Search by class name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={manImage2} alt='' />
        </div>

        <div className='mini-div-center mini-div-center-2'>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <button className='btn1'>+</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
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
                  <Label>Field</Label>
                  <ComboboxDemo
                    options={fields}
                    onSelect={(selected) => {
                      setNewCourse((newCourse) => ({
                        ...newCourse,
                        fieldId: selected?.id,
                      }))
                    }}
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
                  <Label>Description</Label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    className='col-span-3 min-h-[100px] p-2 border rounded-md'
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
        {(searchTerm ? filteredCourses : courses)?.map((course, index) => (
          <tr
            key={course.id}
            className={index === courses.length - 1 ? 'last-row' : ''}
          >
            <td className='Classs'>{course.name}</td>
            <td className='Gradee'>{course.grade}</td>
            <td className='Capa'>{course.capacity}</td>
            <td className='superv'>{course?.supervisor?.name}</td>
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
                      <DialogTitle>Edit Class</DialogTitle>
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
                        <Label>Description</Label>
                        <textarea
                          value={editingCourse?.description || ''}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              description: e.target.value,
                            })
                          }
                          className='col-span-3 min-h-[100px] p-2 border rounded-md'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Supervisor</Label>
                        <Select
                          value={editingCourse?.supervisor?.id || ''}
                          onValueChange={(value) =>
                            setEditingCourse({
                              ...editingCourse,
                              supervisor: { id: value },
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
                      <DialogTitle>Delete Class</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this class? This action
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

import { Label } from '@radix-ui/react-label'
import backgroundImage from '../assets/images/onboarding-side-bg.png'
import React, { useEffect } from 'react'
import { useRef, useReducer } from 'react'
// import ProgressBar from '../components/UI/ProgressBar'
// import progressBar from '../components/UI/ProgressBar'
// import {Button} from 'shadcn-ui'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoArrowForward } from 'react-icons/io5'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown, Camera, Type } from 'lucide-react'
import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ProgressBar from '@/components/UI/ProgressBar'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/UI/alert'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateSchool, getSchools, useGetCities } from '@/api/curriculumApi'
import { useCreateUser } from '@/api/UsersApi'
import { useContext } from 'react'
import { Context } from '@/store'
import ImageCropper from './ImageCropper'

const initialState = {
  firstName: '',
  lastName: '',
  profileImage: null,
  email: '',
  phoneNumber: '',
  gender: '',
  hometown: '',
  school: '',
  city: '',
  role: 'student',
  schoolId: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return { ...state, ...action.payload }
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload }
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload }
    case 'SET_IMAGE':
      return { ...state, image: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload }
    case 'SET_GENDER':
      return { ...state, gender: action.payload }
    case 'SET_HOMETOWN':
      return { ...state, hometown: action.payload }
    case 'SET_SCHOOL':
      return { ...state, school: action.payload }
    case 'SET_SCHOOL_ID':
      return { ...state, schoolId: action.payload }
    case 'SET_CITY':
      return { ...state, city: action.payload }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'SET_PROFILE_IMAGE':
      return { ...state, role: action.profileImage }
    default:
      return state
  }
}

function SchoolsComboBox({ schools = [], handleSelectSchoolNameChange }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[300px] justify-between'
        >
          {value
            ? schools.find((school) => school.name === value)?.name
            : 'Select your school'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search school...' />
          <CommandList>
            <CommandEmpty>Select your school</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.id}
                  value={school.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    handleSelectSchoolNameChange(school.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === school.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {school.name}
                </CommandItem>
              ))}
            </CommandGroup>{' '}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const Box = ({ id, isActive, children }) => {
  console.log(id, isActive)
  return (
    <div
      className={`flex items-center space-x-2 w-56 pl-3  font-medium border-[1px] border-solid rounded-sm  ${
        isActive
          ? ' bg-[rgb(72,128,255)] bg-opacity-15 border-[#4880FF]'
          : ' border-[#F4F4F4] '
      }`}
    >
      <RadioGroupItem value={id} id={id} className='text-primary' />
      <Label className='text-xs  px-3 py-6 cursor-pointer' htmlFor={id}>
        {children}
      </Label>
    </div>
  )
}

const RoleScreen = ({ dispatch, role }) => {
  const handleRoleOptionChange = (value) => {
    dispatch({ type: 'SET_ROLE', payload: value })
  }

  return (
    <section className='pl-9 min-h-[500px]'>
      <div className='mt-11'>
        <h1 className=' text-[24px] font-bold'>Let’s get started</h1>
        <p className='font-semibold'>
          If you already have an account,{' '}
          {/* <span className='text-primary'>Login here</span> */}
          <Link to='/login' className='text-primary'>
            Login here
          </Link>
        </p>
      </div>
      <div className='mt- mt-8'>
        <RadioGroup
          className='flex  items-center flex-wrap'
          onValueChange={handleRoleOptionChange}
          defaultValue={role}
        >
          <Box id='student' isActive={role === 'student'}>
            I&apos;m a student learning, completing assignments, and staying
            organized.
          </Box>
          <Box id='teacher' isActive={role === 'teacher'}>
            I&apos;m a teacher managing classes, tracking progress, and
            accessing resources!
          </Box>
          <Box id='admin' isActive={role === 'admin'}>
            I&apos;m an admin managing users, overseeing operations, and
            ensuring smooth workflow
          </Box>
        </RadioGroup>
      </div>
    </section>
  )
}

const SchoolScreen = ({ dispatch, school, isAdmin, handleNextStep }) => {
  const mutation = useCreateSchool()
  const { data: cities } = useGetCities()
  const [schools, setSchools] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [newCity, setNewCity] = useState('')
  const ctx = useContext(Context)

  useEffect(() => {
    const fetchSchools = async () => {
      console.log('The selected city:', selectedCity)
      try {
        const response = await getSchools(selectedCity)
        setSchools(response)
      } catch (error) {
        console.error('Error fetching schools:', error)
      }
    }

    if (!isOpen && selectedCity) {
      fetchSchools()
    }
  }, [selectedCity, isOpen])

  const handleSchoolNameChange = (e) => {
    console.log(e.target.value)
    dispatch({ type: 'SET_SCHOOL', payload: e.target.value })
    ctx.schoolIdHandler(e.target.value)
  }

  const handleSelectSchoolNameChange = (value) => {
    console.log('Value', value)
    dispatch({ type: 'SET_SCHOOL_ID', payload: value })
  }

  const handleCityChange = (value) => {
    // console.log(value)
    dispatch({ type: 'SET_CITY', payload: value })
    setSelectedCity(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: school,
      city: newCity,
    }
    console.log(formData)

    mutation.mutate(formData, {
      onSuccess: () => {
        console.log('success')
        setIsOpen(false)
        handleNextStep()
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <section className='pl-9 max-h-[800px] min-h-[500px]'>
      <div className='mt-11'>
        <h1 className=' text-[24px] font-bold'>Select Your School</h1>
        <p className='font-semibold'>
          Find and choose your school to personalize your experience
        </p>
      </div>
      <div>
        <Select onValueChange={handleCityChange}>
          <SelectTrigger className='w-[300px] mt-5 mb-3'>
            <SelectValue placeholder='City' />
          </SelectTrigger>
          <SelectContent>
            {cities?.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex'>
          <SchoolsComboBox
            handleSelectSchoolNameChange={handleSelectSchoolNameChange}
            schools={schools}
          />
          {isAdmin && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='ml-2'>
                  Add school
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Add a School</DialogTitle>
                  <DialogDescription>
                    Select a city and enter the school name to add it.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <Label htmlFor='city' className='block'>
                      Choose a city
                    </Label>
                    <Input
                      id='city-name'
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder='Enter city name'
                      required
                    />
                  </div>

                  <div className='mb-4'>
                    <Label htmlFor='school-name' className='block'>
                      School Name
                    </Label>
                    <Input
                      id='school-name'
                      value={school}
                      onChange={handleSchoolNameChange}
                      placeholder='Enter school name'
                      required
                    />
                  </div>

                  <DialogFooter className='sm:justify-start'>
                    <DialogClose asChild>
                      <Button type='button' variant='secondary'>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type='submit' variant='primary'>
                      Add School
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div></div>
    </section>
  )
}

const UserProfileScreen = ({ dispatch, state }) => {
  const fileInputRef = useRef(null)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const isStudent = state.role === 'student'
  const isAdmin = state.role === 'admin'
  const isTeacher = state.role === 'teacher'

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      hometown: '',
      gender: '',
      profileImage: undefined,
      course: '',
    },
  })

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue('profileImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({ type: 'SET_IMAGE_PREVIEW', payload: reader.result })
        dispatch({ type: 'SET_PROFILE_IMAGE', payload: file })
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      // dispatch({ type: 'SET_FORM_DATA', payload: { ...data, role: state.role, city: state.city, school: state.school } });
      console.log(data)
      navigate('/sign-up', {
        state: {
          ...data,
          role: state.role,
          city: state.city,
          schoolId: state.schoolId,
        },
      })
    } catch (error) {
      setErrorMessage(error.message)
      setShowError(true)
    }
  }

  return (
    <section className='w-full flex flex-col px-9'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mt-11 space-y-6 w-full p-0 border-0 shadow-none flex flex-col'>
          <div className='flex justify-center mb-8'>
            <div className='relative'>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
              />
              <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>
                {state.profileImage ? (
                  <img
                    src={state.profileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <Camera className='w-8 h-8 text-gray-400' />
                )}
              </div>
              <button
                type='button'
                className='w-full text-center text-sm text-blue-500 mt-2'
                onClick={handleUploadClick}
              >
                Upload Photo
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-y-6 gap-x-14'>
            {['firstName', 'lastName', 'email'].map((field) => (
              <div key={field} className='space-y-2'>
                <Label htmlFor={field}>
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <Input
                  className='h-14'
                  id={field}
                  placeholder={`Enter your ${field}`}
                  {...form.register(field)}
                />
              </div>
            ))}

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                className='h-14'
                id='phoneNumber'
                type='tel'
                placeholder='Enter your phone number'
                {...form.register('phone')}
              />
            </div>

            {isStudent && (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='hometown'>Hometown</Label>
                  <Input
                    className='h-14'
                    id='hometown'
                    placeholder='Enter your hometown'
                    {...form.register('hometown')}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select
                    onValueChange={(value) => form.setValue('gender', value)}
                  >
                    <SelectTrigger className='h-14 w-32'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='course'>Course</Label>
                  <Select
                    onValueChange={(value) => form.setValue('course', value)}
                  >
                    <SelectTrigger className='h-14 w-full'>
                      <SelectValue placeholder='Select your course' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='class-10'>Class 10</SelectItem>
                      <SelectItem value='class-11'>Class 11</SelectItem>
                      <SelectItem value='class-12'>Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <Button
            type='submit'
            className='w-[274px] mt-6 mx-auto'
            size='lg'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Join Now'}
          </Button>
        </Card>
      </form>

      {showError && (
        <Alert variant='destructive' className='mt-5 mb-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </section>
  )
}

const OnBoarding = () => {
  const [step, setStep] = useState(1)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleNextStep = () => {
    setStep((step) => {
      if (step < 3) {
        return step + 1
      } else {
        return step
      }
    })
  }

  const handlePreviousStep = () => {
    setStep((step) => {
      if (step > 1) {
        return step - 1
      } else {
        return step
      }
    })
  }

  return (
    <div className='flex h-dvh'>
      <section
        className={`min-w-[300px] max-w-[600px] w-[33%] hidden sm:block h-full bg-cover bg-center bg bg-no-repeat text-white pr-10 sm:pr-24 pl-4 pt-10`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h3 className='text-2xl text-white font-medium'>EduVisionAI</h3>
        <h1 className='text-5xl font-bold text-white mt-28'>
          Start your journey with us
        </h1>
        <p className='text-white mt-5'>
          Start your journey with us and explore new opportunities in technology
          and innovation. Whether you&apos;re learning the basics or working on
          advanced projects, we provide the tools and guidance to help you grow.
          Join us today and start building something amazing!
        </p>
      </section>
      <div className='w-full flex flex-col'>
        {/* <UserProfileScreen step={step} /> */}
        <ProgressBar className='mt-20 mx-auto' step={step} />

        <div className='w-full min-h-[600px]'>
          {step === 1 ? (
            <RoleScreen dispatch={dispatch} role={state.role} />
          ) : step === 2 ? (
            <SchoolScreen
              isAdmin={state.role === 'admin'}
              dispatch={dispatch}
              school={state.school}
              handleNextStep={handleNextStep}
            />
          ) : (
            <UserProfileScreen dispatch={dispatch} state={state} />
          )}
        </div>

        <div className='ml-9 mt-6 flex items-center'>
          <Button
            disabled={step === 1}
            onClick={handlePreviousStep}
            variant='outline'
          >
            <MdOutlineArrowBackIos
              className='text-xs fill-[#606060]' // fill-current to inherit from parent
              size={20}
            />
            Previous
          </Button>
          <Button
            disabled={step === 3}
            onClick={handleNextStep}
            className='ml-2 shadow-none'
          >
            Next
            <IoArrowForward className='fill-white stroke-white' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnBoarding

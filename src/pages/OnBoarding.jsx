import React, { createContext, useContext, useState, useRef } from 'react'
import { Label } from '@/components/ui/label'
import backgroundImage from '../assets/images/onboarding-side-bg.png'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { Check, ChevronsUpDown, Camera } from 'lucide-react'
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
import { useForm } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/UI/alert'
import { useCreateSchool, getSchools, useGetCities } from '@/api/curriculumApi'
import { Context } from '@/store'
import { ComboboxDemo } from '@/components/UI/ComboboxDemo'

// Create a context for the onboarding process
const OnboardingContext = createContext(null)

// Create a provider component
const OnboardingProvider = ({ children }) => {
  const [formData, setFormData] = useState({
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
    courseId: '',
  })

  const updateFormData = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const updateMultipleFields = (fieldsObj) => {
    setFormData((prev) => ({ ...prev, ...fieldsObj }))
  }

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateFormData,
        updateMultipleFields,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

// Custom hook to use the context
const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}

// SchoolsComboBox Component
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
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Box component for radio selections
const Box = ({ id, isActive, children }) => {
  return (
    <div
      className={`flex items-center space-x-2 w-56 pl-3 font-medium border-[1px] border-solid rounded-sm ${
        isActive
          ? 'bg-[rgb(72,128,255)] bg-opacity-15 border-[#4880FF]'
          : 'border-[#F4F4F4]'
      }`}
    >
      <RadioGroupItem value={id} id={id} className='text-primary' />
      <Label className='text-xs px-3 py-6 cursor-pointer' htmlFor={id}>
        {children}
      </Label>
    </div>
  )
}

// RoleScreen Component
const RoleScreen = () => {
  const { formData, updateFormData } = useOnboarding()

  const handleRoleOptionChange = (value) => {
    updateFormData('role', value)
  }

  return (
    <section className='pl-9 min-h-[500px]'>
      <div className='mt-11'>
        <h1 className='text-[24px] font-bold'>Let's get started</h1>
        <p className='font-semibold'>
          If you already have an account,{' '}
          <Link to='/login' className='text-primary'>
            Login here
          </Link>
        </p>
      </div>
      <div className='mt-8'>
        <RadioGroup
          className='flex items-center flex-wrap'
          onValueChange={handleRoleOptionChange}
          defaultValue={formData.role}
        >
          <Box id='student' isActive={formData.role === 'student'}>
            I&apos;m a student learning, completing assignments, and staying
            organized.
          </Box>
          <Box id='teacher' isActive={formData.role === 'teacher'}>
            I&apos;m a teacher managing classes, tracking progress, and
            accessing resources!
          </Box>
          <Box id='admin' isActive={formData.role === 'admin'}>
            I&apos;m an admin managing users, overseeing operations, and
            ensuring smooth workflow
          </Box>
        </RadioGroup>
      </div>
    </section>
  )
}

// SchoolScreen Component
const SchoolScreen = ({ handleNextStep }) => {
  const { formData, updateFormData } = useOnboarding()
  const mutation = useCreateSchool()
  const { data: cities } = useGetCities()
  const [schools, setSchools] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [newCity, setNewCity] = useState('')
  const isAdmin = formData.role === 'admin'

  React.useEffect(() => {
    const fetchSchools = async () => {
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
    updateFormData('school', e.target.value)
  }

  const handleSelectSchoolNameChange = (value) => {
    updateFormData('schoolId', value)
  }

  const handleCityChange = (value) => {
    updateFormData('city', value)
    setSelectedCity(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const schoolData = {
      name: formData.school,
      city: newCity,
    }

    mutation.mutate(schoolData, {
      onSuccess: () => {
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
        <h1 className='text-[24px] font-bold'>Select Your School</h1>
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
                    <Label htmlFor='city-name' className='block'>
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
                      value={formData.school}
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
    </section>
  )
}

// UserProfileScreen Component
const UserProfileScreen = () => {
  const { formData, updateFormData, updateMultipleFields } = useOnboarding()
  const fileInputRef = useRef(null)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const isStudent = formData.role === 'student'
  const { roleHandler } = useContext(Context)

  const form = useForm({
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phoneNumber || '',
      hometown: formData.hometown || '',
      gender: formData.gender || '',
      courseId: formData.courseId || '',
    },
  })

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue('profileImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData('profileImage', file)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Update the context with form data
      updateMultipleFields({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        hometown: data.hometown,
        gender: data.gender,
        courseId: data.courseId,
      })

      roleHandler(formData.role)

      if (formData.role === 'student') {
        navigate('/image-crop', {
          state: {
            ...data,
            role: formData.role,
            city: formData.city,
            schoolId: formData.schoolId,
          },
        })
      } else {
        navigate('/sign-up', {
          state: {
            ...data,
            role: formData.role,
            city: formData.city,
            schoolId: formData.schoolId,
          },
        })
      }
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
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
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
                  placeholder={`Enter your ${field
                    .replace(/([A-Z])/g, ' $1')
                    .trim()}`}
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
                      <SelectItem value='Male'>Male</SelectItem>
                      <SelectItem value='Female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='course'>Class</Label>
                  <ComboboxDemo
                    placeholder='Select course'
                    onSelect={(selected) =>
                      form.setValue('courseId', selected.id)
                    }
                    options={[
                      {
                        name: 'GI',
                        id: 1,
                      },
                    ]}
                  />
                  {/* <Select
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
                  </Select> */}
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

// Main OnBoarding Component
const OnBoarding = () => {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep))
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep))
  }

  return (
    <OnboardingProvider>
      <div className='flex h-dvh'>
        <section
          className='min-w-[300px] max-w-[600px] w-[33%] hidden sm:block h-full bg-cover bg-center bg-no-repeat text-white pr-10 sm:pr-24 pl-4 pt-10'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h3 className='text-2xl text-white font-medium'>EduVisionAI</h3>
          <h1 className='text-5xl font-bold text-white mt-28'>
            Start your journey with us
          </h1>
          <p className='text-white mt-5'>
            Start your journey with us and explore new opportunities in
            technology and innovation. Whether you&apos;re learning the basics
            or working on advanced projects, we provide the tools and guidance
            to help you grow. Join us today and start building something
            amazing!
          </p>
        </section>
        <div className='w-full flex flex-col'>
          <ProgressBar className='mt-20 mx-auto' step={step} />

          <div className='w-full min-h-[600px]'>
            {step === 1 ? (
              <RoleScreen />
            ) : step === 2 ? (
              <SchoolScreen handleNextStep={handleNextStep} />
            ) : (
              <UserProfileScreen />
            )}
          </div>

          <div className='ml-9 mt-6 flex items-center'>
            <Button
              disabled={step === 1}
              onClick={handlePreviousStep}
              variant='outline'
            >
              <MdOutlineArrowBackIos
                className='text-xs fill-[#606060]'
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
    </OnboardingProvider>
  )
}

export default OnBoarding

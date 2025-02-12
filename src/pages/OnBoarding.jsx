import { Label } from '@radix-ui/react-label'
import backgroundImage from '../assets/images/onboarding-side-bg.png'
import React from 'react'
import { useRef } from 'react'
// import ProgressBar from '../components/UI/ProgressBar'
// import progressBar from '../components/UI/ProgressBar'
// import {Button} from 'shadcn-ui'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoArrowForward } from 'react-icons/io5'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
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

const schools = [
  {
    value: 'esta',
    label: 'EST Agadir',
  },
  {
    value: 'enset',
    label: 'ENSET Mohammedia',
  },
  {
    value: 'fst',
    label: 'FST Marrakech',
  },
  {
    value: 'estg',
    label: 'EST guelmim',
  },
]

function SchoolsComboBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

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
            ? schools.find((school) => school.value === value)?.label
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
                  key={school.value}
                  value={school.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === school.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {school.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const Box = ({ id, isActive, children }) => {
  return (
    <div
      className={`flex items-center space-x-2 w-56 pl-3  font-medium border-[1px] border-solid rounded-sm  ${
        isActive
          ? ' bg-[#4880FF] bg-opacity-15 border-[#4880FF]'
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

const RoleScreen = () => {
  const [selectedRoleOption, setSelectedRoleOption] = useState('option-one')

  return (
    <section className='pl-9 min-h-[500px]'>
      <div className='mt-20'></div>
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
          onValueChange={(value) => setSelectedRoleOption(value)}
          defaultValue='option-one'
        >
          <Box id='option-one' isActive={selectedRoleOption === 'option-one'}>
            I&apos;m a student learning, completing assignments, and staying
            organized.
          </Box>
          <Box id='option-two' isActive={selectedRoleOption === 'option-two'}>
            I&apos;m a teacher managing classes, tracking progress, and
            accessing resouvces!
          </Box>
          <Box
            id='option-three'
            isActive={selectedRoleOption === 'option-three'}
          >
            I&apos;m an admin managing users, overseeing operations, and
            ensuring smooth workflow
          </Box>
        </RadioGroup>
      </div>
    </section>
  )
}

const SchoolScreen = () => {
  const [selectedCity, setSelectedCity] = useState('')
  const [schoolName, setSchoolName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the submission logic
    console.log(`City: ${selectedCity}, School: ${schoolName}`)
  }

  return (
    <section className='pl-9 max-h-[800px] min-h-[500px]'>
      <div className='mt-20'></div>
      <div className='mt-11'>
        <h1 className=' text-[24px] font-bold'>Select Your School</h1>
        <p className='font-semibold'>
          Find and choose your school to personalize your experience
        </p>
      </div>
      <div>
        <Select>
          <SelectTrigger className='w-[300px] mt-5 mb-3'>
            <SelectValue placeholder='City' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='agadir'>Agadir</SelectItem>
            <SelectItem value='casablanca'>Casablanca</SelectItem>
            <SelectItem value='marrakech'>Marrakech</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex'>
          <SchoolsComboBox />
          <Dialog>
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
                  <Select
                    id='city'
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a city' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='new-york'>New York</SelectItem>
                      <SelectItem value='los-angeles'>Los Angeles</SelectItem>
                      <SelectItem value='chicago'>Chicago</SelectItem>
                      {/* Add more cities here */}
                    </SelectContent>
                  </Select>
                </div>

                <div className='mb-4'>
                  <Label htmlFor='school-name' className='block'>
                    School Name
                  </Label>
                  <Input
                    id='school-name'
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
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
        </div>
      </div>
      <div></div>
    </section>
  )
}

const UserProfileScreen = ({ step }) => {
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle the file upload here
      console.log('File selected:', file.name)
    }
  }

  return (
    <section className='w-full flex flex-col px-9  min-h-[500px]'>
      <ProgressBar className='mt-20 mx-auto' step={step} />
      <Card className='mt-11  space-y-6  w-full p-0 border-0 shadow-none flex flex-col'>
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
              accept='image/*'
            />
            <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center'>
              <Camera className='w-8 h-8 text-gray-400' />
            </div>
            <button
              className='w-full text-center text-sm text-blue-500 mt-2'
              onClick={handleUploadClick}
            >
              Upload Photo
            </button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-6 gap-x-14'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              className=' h-14'
              id='firstName'
              placeholder='Enter your first name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              className='h-14'
              id='lastName'
              placeholder='Enter your last name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Your email</Label>
            <Input
              className='h-14'
              id='email'
              type='email'
              placeholder='Enter your email'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              className='h-14'
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='hometown'>Hometown (optional)</Label>
            <Input
              className='h-14'
              id='hometown'
              placeholder='Enter your birthdate'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='gender'>Gender</Label>
            <Select>
              <SelectTrigger className='h-14 w-32'>
                <SelectValue placeholder='Male' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>Male</SelectItem>
                <SelectItem value='female'>Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className='w-[274px] mt-6 mx-auto' size='lg'>
          Add Now
        </Button>
      </Card>
    </section>
  )
}

const OnBoarding = () => {
  const [step, setStep] = useState(1)

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
    <div className='flex'>
      <section
        className={`min-w-[300px] max-w-[600px] w-[33%] hidden sm:block h-full bg-cover bg-center bg bg-no-repeat text-white pr-24 pl-11 pt-10`}
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
      <div className='w-full'>
        <UserProfileScreen step={step} />
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

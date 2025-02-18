import backgroundImage from '../assets/images/onboarding-side-bg.png'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger} from '@/components/ui/alert-dialog'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

const Box = () => {
  return (

    <RadioGroup defaultValue='option-one' className="[--primary:theme(colors.blue.600)]">
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option-one' id='option-one' />
        <Label htmlFor='option-one'>Option One</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option-two' id='option-two' />
        <Label htmlFor='option-two'>Option Two</Label>
      </div>
    </RadioGroup>
  )
}
const MyComponents = () => {
  return (

    <div className='flex [--primary:theme(colors.blue.600)]'>
      <section
        className={`min-w-[300px] max-w-[600px] w-[33%] h-dvh bg-cover bg-center bg bg-no-repeat text-white pr-24 pl-11 pt-10`}
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
          and innovation. Whether you're learning the basics or working on
          advanced projects, we provide the tools and guidance to help you grow.
          Join us today and start building something amazing!
        </p>
      </section>
      <section className="flex-1 p-8">
        <div className='mt-20 ml-9'>
          <Input type="text" placeholder="Enter your details" />
          <Select>
            <SelectTrigger className="w-full mt-4">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4">
            <Calendar className="rounded-md border" />
          </div>
        </div>
        <div className='mt-11 ml-9'>
          <h1 className='text-[24px] font-bold'>Let's get started</h1>
          <p className='font-semibold'>
            If you already have an account,{' '}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-primary p-0">Login here</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login to your account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Button className="w-full">Login</Button>
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </div>
        <div className='mt-8 flex'>
          <Box />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mt-4">Need Help?</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Contact support for assistance</p>
          </PopoverContent>
        </Popover>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="mt-4">Terms & Conditions</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Terms & Conditions</AlertDialogTitle>
              <AlertDialogDescription>
                By continuing, you agree to our terms and conditions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Accept</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}

export default MyComponents
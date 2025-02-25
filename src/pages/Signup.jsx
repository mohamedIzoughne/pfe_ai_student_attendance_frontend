import { SignUp, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCreateUser } from '@/api/UsersApi'

const SignUpPage = () => {
  const { user } = useUser()
  const location = useLocation()
  const data = location.state
  const createUser = useCreateUser()

  // ✅ Prevent multiple requests by tracking submission
  const [hasSubmitted, setHasSubmitted] = useState(false)

  console.log('The data', data)

  useEffect(() => {
    if (user && !hasSubmitted) {
      createUser.mutate({ ...data, clerkId: user.id })
      setHasSubmitted(true) // ✅ Prevent duplicate submissions
    }
  }, [user, hasSubmitted, createUser, data])

  return (
    <div className='flex justify-center mt-20'>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#4880FF',
          },
          elements: {
            formButtonPrimary: {
              color: '#fff',
            },
          },
        }}
        signInUrl='/login'
        fallbackRedirectUrl='/'
      />
    </div>
  )
}

export default SignUpPage

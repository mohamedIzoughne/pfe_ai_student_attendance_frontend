import { SignUp, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCreateUser } from '@/api/UsersApi'

const SignUpPage = () => {
  const { isSignedIn } = useUser()
  const location = useLocation()
  const data = location.state
  const createUser = useCreateUser()

  const [hasSubmitted, setHasSubmitted] = useState(false)

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
        fallbackRedirectUrl='/register'
        initialValues={{
          emailAddress: data?.email || '',
        }}
      />
    </div>
  )
}

export default SignUpPage

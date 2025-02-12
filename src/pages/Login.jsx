import { SignIn } from '@clerk/clerk-react'

const LoginPage = () => {
  return (
    <div className='flex justify-center mt-20'>
      <SignIn
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
        signUpUrl='/sign-up'
        fallbackRedirectUrl='/'
      />
    </div>
  )
}

export default LoginPage

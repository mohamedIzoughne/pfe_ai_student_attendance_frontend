import { SignUp, useUser } from '@clerk/clerk-react'
import { useState } from 'react';

const SignUpPage = () => {
  const {user} = useUser()
  const [formData, setFormData] = useState({
    name: "Moha",
    gender: "Male",
    hometown: "Taznakht",
    image: "",
    role: "student",
  });


  if (user) {
    const sendDataToBackend = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            email: user.primaryEmailAddress.emailAddress,
            clerk_id: user.id,
          }),
        });

        if (response.ok) {
          console.log("User registered successfully");
        } else {
          console.error("Failed to register user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendDataToBackend();

  }



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

import React, { createContext, useState } from 'react'

export const Context = createContext()

const initialState = {
  name: '',
  role: 'student',
  email: '',
  phoneNumber: 0,
  hometown: '',
  gender: 'male',
  image: '',
}

export const ContextProvider = ({ children }) => {
  const [userConfiguration, setUserConfiguration] = useState(initialState)

  const nameHandler = (name) => {
    setUserConfiguration((prev) => ({ ...prev, name }))
  }

  const roleHandler = (role) => {
    setUserConfiguration((prev) => ({ ...prev, role }))
  }

  const emailHandler = (email) => {
    setUserConfiguration((prev) => ({ ...prev, email }))
  }

  const phoneNumberHandler = (phoneNumber) => {
    setUserConfiguration((prev) => ({ ...prev, phoneNumber }))
  }

  const hometownHandler = (hometown) => {
    setUserConfiguration((prev) => ({ ...prev, hometown }))
  }

  const genderHandler = (gender) => {
    setUserConfiguration((prev) => ({ ...prev, gender }))
  }

  const imageHandler = (image) => {
    setUserConfiguration((prev) => ({ ...prev, image }))
  }

  return (
    <Context.Provider
      value={{
        userConfiguration,
        nameHandler,
        roleHandler,
        emailHandler,
        phoneNumberHandler,
        hometownHandler,
        genderHandler,
        imageHandler,
      }}
    >
      {children}
    </Context.Provider>
  )
}

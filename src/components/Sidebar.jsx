import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SlHome } from 'react-icons/sl'
import { FaRegFlag } from 'react-icons/fa6'
import { PiStudent } from 'react-icons/pi'
import { LuNotebookText, LuBookOpenText } from 'react-icons/lu'

const sidebarTerms = [
  'Home',
  'Mark attendance',
  'Exams',
  'Students',
  'Complaints',
]

const sidebarTermsObject = {
  Home: '/',
  'Mark attendance': '/mark-attendance',
  Exams: '/exams',
  Students: '/students',
  Complaints: '/complaints',
}

const sidebarTermsIcons = {
  Home: SlHome,
  'Mark attendance': FaRegFlag,
  Exams: LuBookOpenText,
  Students: PiStudent,
  Complaints: LuNotebookText,
}

const termsIcons = {
  Home: <FaHome />,
}

const SidebarItem = ({ title }) => {
  // const isActive = activeRoute === title
  // const handleRoute = () => {
  //   setActiveRoute(title)
  // }
  const location = useLocation()
  const isActive = location.pathname === sidebarTermsObject[title]
  const Icon = sidebarTermsIcons[title]
  return (
    <li
      className={
        (isActive ? 'text-white' : '') +
        ' flex items-center mt-7 h-[57px] mr-2 '
      }
    >
      <div
        className={`${
          isActive ? 'bg-primary' : ''
        } w-[5px] h-[57px] mr-5 rounded-r-md`}
      ></div>
      <Link
        to={sidebarTermsObject[title]}
        className={`${
          isActive ? 'bg-primary' : ''
        } h-full flex items-center w-[241px] rounded-md pl-3`}
      >
        {/* <FaHome
          className={`${isActive ? 'fill-white' : ''} text-white   mr-3`}
          color='#ffffff'
        /> */}
        {
          <Icon
            className={`${isActive ? 'fill-white text-white' : ''}   mr-3`}
          />
        }
        {title}
      </Link>
    </li>
  )
}

const Sidebar = () => {
  return (
    <div className='bg-white text-[#202224]'>
      {/* <h2>Dashboard</h2> */}
      <nav className=' mt-48'>
        <ul style={{ listStyle: 'none', padding: 0, color: 'white' }}>
          {sidebarTerms.map((term) => {
            return (
              <SidebarItem
                title={term}
                // isActive={term === 'Home'}
                key={term}
              ></SidebarItem>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

import { Link, useLocation } from 'react-router-dom'
import { useContext, useMemo } from 'react'
import { Context } from '@/store'
import { SlHome } from 'react-icons/sl'
import { FaRegFlag } from 'react-icons/fa6'
import { PiStudent } from 'react-icons/pi'
import { LuNotebookText, LuBookOpenText } from 'react-icons/lu'
import logo1 from '../assets/images/logo.png'
import { GiTeacher } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


const sidebarTermsIcons = {
  Home: SlHome,
  Teachers: LiaChalkboardTeacherSolid,
  Classes: GiTeacher,
  'Mark attendance': FaRegFlag,
  Exams: LuBookOpenText,
  Students: PiStudent,
  Complaints: LuNotebookText,
}

const SidebarItem = ({ title, path }) => {
  const location = useLocation()
  const isActive =
    (location.pathname === '/' && title === 'Home') ||
    (path !== '/' && location.pathname.startsWith(path))

  // console.log(
  //   '1:',
  //   location.pathname,
  //   title,
  //   location.pathname === '/' && title === 'Home'
  // )
  // console.log(
  //   '2:',
  //   location.pathname,
  //   title,
  //   path !== '/' && location.pathname.startsWith(path)
  // )

  const Icon = sidebarTermsIcons[title]

  return (
    <li className={`flex items-center mt-7 h-[57px] mr-2`}>
      <div
        className={`${
          isActive ? 'bg-primary' : ''
        } w-[5px] h-[57px] mr-5 rounded-r-md`}
      ></div>
      <Link
        to={path}
        className={`h-full flex items-center w-[241px] rounded-md pl-3 ${
          isActive ? 'bg-primary text-white' : ''
        }`}
      >
        {Icon && (
          <Icon
            className={`${
              isActive ? 'stroke-white text-white fill-white' : ''
            } mr-3`}
          />
        )}
        {title}
      </Link>
    </li>
  )
}

const Sidebar = () => {
  const { userConfiguration } = useContext(Context)
  const userRole = userConfiguration?.role // Default to 'teacher' if undefined

  // Sidebar terms and paths based on role
  const sidebarItems = useMemo(() => {
    if (userRole === 'admin') {
      return [
        { title: 'Home', path: '/' },
        { title: 'Students', path: '/students' },
        { title: 'Teachers', path: '/teachers' },
        { title: 'Classes', path: '/classes' },
      ]
    } else {
      return [
        { title: 'Home', path: '/' },
        { title: 'Mark attendance', path: '/mark-attendance' },
        { title: 'Exams', path: '/exams' },
        { title: 'Students', path: '/students' },
        { title: 'Complaints', path: '/complaints' },
      ]
    }
  }, [userRole])

  return (
    <div className='bg-white text-[#202224]'>
      <div className='logo w-[160px] mx-auto mt-20'>
        <img src={logo1} alt='' />
      </div>
      <nav className=''>
        <ul style={{ listStyle: 'none', padding: 0, color: 'white' }}>
          {sidebarItems.map(({ title, path }) => (
            <SidebarItem key={title} title={title} path={path} />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

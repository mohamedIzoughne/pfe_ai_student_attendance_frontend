import { Link, useLocation } from 'react-router-dom'
import { useContext, useMemo } from 'react'
import { Context } from '@/store'
import { SlHome } from 'react-icons/sl'
import { FaRegFlag } from 'react-icons/fa6'
import { PiStudent } from 'react-icons/pi'
import { LuNotebookText, LuBookOpenText } from 'react-icons/lu'

const sidebarTermsIcons = {
  Home: SlHome,
  Teachers: SlHome,
  Courses: SlHome,
  'Mark attendance': FaRegFlag,
  Exams: LuBookOpenText,
  Students: PiStudent,
  Complaints: LuNotebookText,
}

const SidebarItem = ({ title, path }) => {
  const location = useLocation()
  const isActive = location.pathname === path
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
        { title: 'Home', path: '/admin' },
        { title: 'Students', path: '/students' },
        { title: 'Teachers', path: '/teachers' },
        { title: 'Courses', path: '/courses' },
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
      <nav className='mt-48'>
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

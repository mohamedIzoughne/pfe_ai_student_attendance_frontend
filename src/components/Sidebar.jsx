import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const sidebarTerms = [
  'Home',
  'Mark attendance',
  'Exams',
  'Students',
  'Complaints',
]

const termsIcons = {
  Home: <FaHome />,
}

const SidebarItem = ({ children, isActive = false }) => {
  return (
    <li
      className={
        (isActive ? 'text-white' : '') +
        ' flex items-center mt-7 h-[57px] mr-2 '
      }
    >
      <div
        className={`${
          isActive ? 'bg-[#4880FF]' : ''
        } w-[5px] h-[57px] mr-5 rounded-r-md`}
      ></div>
      <Link
        to='/'
        className={`${
          isActive ? 'bg-[#4880FF]' : ''
        } h-full flex items-center w-[241px] rounded-md pl-3`}
      >
        <FaHome
          className={`${isActive ? 'text-white' : ''} text-[#4880FF] mr-3`}
          color='#ffffff'
        />
        {children}
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
              <SidebarItem isActive={term === 'Home'} key={term}>
                {term}
              </SidebarItem>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

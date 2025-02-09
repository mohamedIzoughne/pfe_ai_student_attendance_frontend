import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Stays Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className='bg-[#F2F2F6]'
        style={{ flex: 1, padding: '20px', overflowY: 'auto' }}
      >
        <Outlet />{' '}
        {/* This is where child components (pages) will be rendered */}
      </div>
    </div>
  )
}

export default Layout

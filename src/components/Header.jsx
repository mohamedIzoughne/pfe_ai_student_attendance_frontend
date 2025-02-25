import { useState } from 'react'
import { Bell } from 'lucide-react'
import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'

const Header = () => {
  const [notifications, setNotifications] = useState(6)
  const [date, setDate] = useState()

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0) // Simule la lecture des notifications
    }
  }

  return (
    <>
      {' '}
      <div className='div0'>
        <div
          className='notification-container'
          onClick={handleNotificationClick}
        >
          <Bell className='notification-icon' size={30} color='#4880FF' />
          {notifications > 0 && (
            <span className='notification-badge'>{notifications}</span>
          )}
        </div>
        <img className='img2' src={manImage} alt='' />
        <div className='mini-div'>
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className='img3' src={manImage1} alt='' />
      </div>
    </>
  )
}

export default Header

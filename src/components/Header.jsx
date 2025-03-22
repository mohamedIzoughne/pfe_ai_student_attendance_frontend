import { useContext, useState } from 'react'
import { Bell } from 'lucide-react'
import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Context } from '@/store'

const Header = () => {
  const { userConfiguration } = useContext(Context)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Message',
      description: 'John Doe sent you a message',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Assignment Due',
      description: 'Math homework is due tomorrow',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'System Update',
      description: 'New features available',
      time: '2 hours ago',
      read: false,
    },
  ])

  const unreadCount = notifications.filter((notif) => !notif.read).length

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  return (
    <>
      <div className='div0'>
        <Popover>
          <PopoverTrigger>
            <div className='notification-container'>
              <Bell className='notification-icon' size={30} color='#4880FF' />
              {unreadCount > 0 && (
                <span className='notification-badge'>{unreadCount}</span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold mb-2'>Notifications</h3>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className='font-medium'>{notification.title}</div>
                  <div className='text-sm text-gray-600'>
                    {notification.description}
                  </div>
                  <div className='text-xs text-gray-400 mt-1'>
                    {notification.time}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <img className='img2' src={manImage} alt='' />
        <div className='mini-div'>
          <span>Mohamed Aloui</span>
          <h4>{userConfiguration.role[0].toUpperCase() + userConfiguration.role.slice(1)}</h4>
        </div>
        <img className='img3' src={manImage1} alt='' />
      </div>
    </>
  )
}

export default Header

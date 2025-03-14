import React from 'react'
import './Teachers.css'
import manImage4 from '@/assets/images/man-438081_960_720.png'
import manImage41 from '@/assets/images/image (2).png'
import manImage5 from '@/assets/images/More.png'
import manImage6 from '@/assets/images/Ellipse 2755.png'
import { useState } from 'react'
import { Bell } from 'lucide-react'
import { IoAddOutline } from 'react-icons/io5'

import { Input } from '@/components/ui/input'
import manImage2 from '@/assets/images/search.png'

import { FiEdit3 } from 'react-icons/fi'

function Teachers() {
  const [notifications, setNotifications] = useState(6)

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0)
    }
  }

  return (
    <>
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
        <img className='img2' src={manImage4} alt='' />
        <div className='mini-div'>
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className='img3' src={manImage5} alt='' />
      </div>

      <div className='title'>
        <h3> Teachers </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='students-admin-principal'>
        <div className='students-admin'>
          <div>
            <Input className='w-60 my-7' />
            <img className='sear-img' src={manImage2} alt='' />
          </div>

          

          <div className='student-name hover:bg-[#EEEEEE]'>
            <div>
              <img src={manImage6} alt='' />
            </div>
            <div className='name'>
              <span className='span-1'>Mohammed Izourne</span>
              <span className='text-[#454545] text-xs'>GI 1</span>
            </div>
          </div>

          {/* <div className='student-name hover:bg-[#EEEEEE]'>
            <div>
              <img src={manImage6} alt='' />
            </div>
            <div className='name'>
              <span className='span-1'>Mohammed Izourne</span>
              <span className='text-[#454545] text-xs'>GI 1</span>
            </div>
          </div>

          <div className='student-name hover:bg-[#EEEEEE]'>
            <div>
              <img src={manImage6} alt='' />
            </div>
            <div className='name'>
              <span className='span-1'>Mohammed Izourne</span>
              <span className='text-[#454545] text-xs'>GI 1</span>
            </div>
          </div>

          <div className='student-name hover:bg-[#EEEEEE]'>
            <div>
              <img src={manImage6} alt='' />
            </div>
            <div className='name'>
              <span className='span-1'>Mohammed Izourne</span>
              <span className='text-[#454545] text-xs'>GI 1</span>
            </div>
          </div> */}
        </div>

        <div className='student-admin-infos'>
          <div className='std-info'>
            <div className='st-info-header'>
              <h2>Personal info</h2>
              <FiEdit3 className='mx-6 my-2 cursor-pointer' />
            </div>

            <div className='Inpt-infos '>
              <div className='col-12 col-md-6 w-1/2'>
                <div>
                  <label htmlFor=''>Full Name</label>
                  <div className='information'>Mohammed Izourne</div>
                </div>
                <div>
                  <label htmlFor=''>Phone number</label>
                  <div className='information'>+212 638344943</div>
                </div>
              </div>

              <div className='col-12 col-md-6 w-1/2'>
                <div>
                  <label htmlFor=''>Number of sessions</label>
                  <div className='information'>5</div>
                </div>

                <div>
                  <label htmlFor=''>Teacher ID</label>
                  <div className='information'>izourne@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className='infos-supple'>
            <div className='std-info-contain'>
              <div className='div-img'>
                <img src={manImage41} alt='' />
              </div>

              <div>
                <h1>Mohammed Izourne</h1>
                <p>Izourne@gmail.com</p>
              </div>
            </div>
            <div className='hometown'>
              <h1>Degree</h1>
              <div>
                <div className='information'>Doctorah</div>
              </div>
            </div>
          </div>
          <div className='div-Table div-Table-two '>
            <div className='just-title'>
              <h3>Schedule</h3>
            </div>
            <table className='h-14'>
              <tr>
                <th></th>
                <th className='high-title'>Monday</th>
                <th className='high-title'>Tuesday</th>
                <th className='high-title'>Wednesday</th>
                <th className='high-title'>Thursday</th>
                <th className='high-title'>Friday</th>
                <th className='high-title'>Saturday</th>
              </tr>
              <tr>
                <td className='special'>
                  8h30m <br /> - <br />
                  10h15m
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#FDFCE8]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='special'>
                  10h30m <br /> - <br />
                  12h15m
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#FDFCE8]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#F8ECF6]' color='#F8ECF6'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#FDFCE8]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='special'>
                  14h30m <br /> - <br />
                  16h15m
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#F8ECF6]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='special'>
                  16h30m <br /> - <br />
                  18h15m
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#FDFCE8]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  {' '}
                  <div className='th-div bg-[#F3F0FF]'>
                    <p>Classe GI 1 G3 - Java</p>
                    <h2>Java</h2>
                  </div>
                </td>
                <td>
                  <button>
                    <IoAddOutline className='stroke-[#538cac] Add-Button' />
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Teachers

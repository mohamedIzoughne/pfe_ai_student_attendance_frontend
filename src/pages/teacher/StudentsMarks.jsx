// import "./Complaints.css";

import './Students_marks.css'

import { Input } from '@/components/ui/input'
import { ComboboxDemo } from '@/components/ui/ComboboxDemo'
import { Bell } from 'lucide-react'
import { useState } from 'react'

import manImage from '@/assets/images/man-438081_960_720.png'
import manImage1 from '@/assets/images/More.png'
import manImage2 from '@/assets/images/search.png'

import { IoHandLeftOutline } from 'react-icons/io5'
import { IoMdCheckmark } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { CiExport } from 'react-icons/ci'
import { PiDownloadSimple } from 'react-icons/pi'
import { useRef } from 'react'
import manImage3 from '@/assets/images/WhatsApp Image 2025-02-11 à 23.37.14_feef5af2.jpg'
import Header from '@/components/Header'

const StudentsMarks = () => {
  const fileInputRef = useRef(null)

  // Fonction pour déclencher le clic sur l'input file
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  // Fonction appelée quand un fichier est sélectionné
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      console.log('Fichier sélectionné:', selectedFile.name)
      // Ici vous pourriez ajouter votre logique pour traiter le fichier
    }
  }

  return (
    <>
      <Header />

      {/* <div className="title">
        <h3> Complaints </h3>
        <div className="vide">
          <div className="vide-vide"></div>
        </div>
      </div> */}

      <div className='title'>
        <h3> Students marks </h3>
        <div className='vide'>
          <div className='vide-vide'></div>
        </div>
      </div>

      <div className='div-center'>
        <div>
          <Input placeholder='Search Student name or id' />
          <img src={manImage2} alt='' />
        </div>

        <div className='mini-div-center'>
          {/* <div>
            <ComboboxDemo placeholder="Class" width="100px" />
          </div>
          <div>
            <ComboboxDemo placeholder="Session" width="120px" />
          </div> */}

          <div>
            <ComboboxDemo placeholder='Sort by' width='112px' />
          </div>
          <div>
            <ComboboxDemo placeholder='Approval' width='124px' />
          </div>
          <div>
            <Button
              variant='outline'
              className='flex'
              onClick={handleButtonClick}
            >
              Export
              <CiExport />
            </Button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
            />
          </div>
          <div>
            <Button variant='outline'>
              Import
              <PiDownloadSimple />
            </Button>
          </div>
          <button className='btn1'>+</button>
        </div>
      </div>

      {/* <table className="complaints-table">
        <tr>
          <th>Student ID</th>
          <th>Student name</th>
          <th>Execuse</th>
          <th>Session</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td className="std-idd">00001</td>
          <td className="std-namee">Christine Brooks</td>
          <td className="execuse">I had a medical appointement</td>
          <td className="sessionn">Java TD - 04 Sep 2019</td>
          <td>
            <div className="icons-reason flex justify-center align-middle">
              <IoMdCheckmark className="fill-green-500 cursor-pointer mr-2" />
              <IoHandLeftOutline className="stroke-[red] cursor-pointer" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="std-idd">00001</td>
          <td className="std-namee">Christine Brooks</td>
          <td className="execuse">I had a medical appointement</td>
          <td className="sessionn">Java TD - 04 Sep 2019</td>
          <td>
            <div className="icons-reason flex justify-center align-middle">
              <IoMdCheckmark className="fill-green-500 cursor-pointer mr-2" />
              <IoHandLeftOutline className=" stroke-[red] cursor-pointer" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="std-idd">00001</td>
          <td className="std-namee">Christine Brooks</td>
          <td className="execuse">I had a medical appointement</td>
          <td className="sessionn">Java TD - 04 Sep 2019</td>
          <td>
            <div className="icons-reason flex justify-center align-middle">
              <IoMdCheckmark className="fill-green-500 cursor-pointer mr-2" />
              <IoHandLeftOutline className="stroke-[red] cursor-pointer" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="std-idd">00001</td>
          <td className="std-namee">Christine Brooks</td>
          <td className="execuse">I had a medical appointement</td>
          <td className="sessionn">Java TD - 04 Sep 2019</td>
          <td>
            <div className="icons-reason flex justify-center align-middle">
              <IoMdCheckmark className="fill-green-500 cursor-pointer mr-2" />
              <IoHandLeftOutline className="stroke-[red] cursor-pointer" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="std-idd">00001</td>
          <td className="std-namee">Christine Brooks</td>
          <td className="execuse">I had a medical appointement</td>
          <td className="sessionn">Java TD - 04 Sep 2019</td>
          <td>
            <div className="icons-reason flex justify-center align-middle">
              <IoMdCheckmark className="fill-green-500 cursor-pointer mr-2" />
              <IoHandLeftOutline className="stroke-[red] cursor-pointer" />
            </div>
          </td>
        </tr>
      </table> */}

      <table className='Marks-table'>
        <tr>
          <th>Image</th>
          <th>Student name</th>
          <th>Student ID</th>
          <th>Mark</th>
          <th>Notes</th>
        </tr>
        <tr>
          <td>
            <div>
              <img src={manImage3} alt='' />
            </div>
          </td>
          <td className='Name-mark'>Mohamed Izourne</td>
          <td className='id-mark'>24439347</td>
          <td className='mark'>10</td>
          <td className='notes'>
            <button>+ Notes</button>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <img src={manImage3} alt='' />
            </div>
          </td>
          <td className='Name-mark'>Mohamed Izourne</td>
          <td className='id-mark'>24439347</td>
          <td className='mark'>15</td>
          <td className='notes'></td>
        </tr>
        <tr>
          <td>
            <div>
              <img src={manImage3} alt='' />
            </div>
          </td>
          <td className='Name-mark'>Mohamed Izourne</td>
          <td className='id-mark'>24439347</td>
          <td className='mark'>18</td>
          <td className='mark-notes stroke-[#434343]'>
            You should do better the next time. you could do it
          </td>
        </tr>
      </table>
    </>
  )
}

export default StudentsMarks

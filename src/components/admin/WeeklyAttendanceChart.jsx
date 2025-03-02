import { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
const data = [
  {
    weekDay: 'Monday',
    presence: 4000,
    absence: 2400,
  },
  {
    weekDay: 'Monday',
    presence: 3000,
    absence: 1398,
  },
  {
    weekDay: 'Monday',
    presence: 2000,
    absence: 4800,
  },
  {
    weekDay: 'Monday',
    presence: 2780,
    absence: 3908,
  },
  {
    weekDay: 'Monday',
    presence: 1890,
    absence: 4800,
  },
  {
    weekDay: 'Monday',
    presence: 2390,
    absence: 3800,
  },
  {
    weekDay: 'Monday',
    presence: 3490,
    absence: 4300,
  },
]

import { useGetWeeklyAttendance } from '@/api/attendanceApi'
import { ComboboxDemo } from '../UI/ComboboxDemo'
import { useGetCourses } from '@/api/curriculumApi'

const WeeklyAttendanceChart = () => {
  const [selectedCourse, setSelectedCourse] = useState({})
  const { data: WeeklyAttendanceData } = useGetWeeklyAttendance(
    selectedCourse.id
  )
  const { data: courses } = useGetCourses(1)
  
  console.log(selectedCourse.id, WeeklyAttendanceData)

  return (
    <>
      <div className='div2-2'>
        <div className='mini-div-2'>
          <h4>Weekly Attendance</h4>
          <div className='comboButton'>
            <ComboboxDemo
              onSelect={setSelectedCourse}
              options={courses}
              placeholder='class'
              width='120px'
            />
            {/* <ComboboxDemo width='100px' /> */}
          </div>
        </div>
        <div className='piechart-1'>
          <ResponsiveContainer height={250} width='100%'>
            <LineChart
              data={WeeklyAttendanceData}
              margin={{ right: 25, left: 30, top: 40 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='weekDay' interval='preserveEnd' />
              <YAxis interval='preserveEnd' />
              <Line
                type='monotone'
                dataKey='absence'
                stroke='#8280FF'
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='presence' stroke='#FF9066' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
export default WeeklyAttendanceChart

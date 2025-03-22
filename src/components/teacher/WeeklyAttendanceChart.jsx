import { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { useState, useEffect } from 'react'

import {
  useGetTeacherWeeklyAttendance,
  useGetWeeklyAttendance,
} from '@/api/attendanceApi'
import { ComboboxDemo } from '../UI/ComboboxDemo'
import { useGetCourses } from '@/api/curriculumApi'
import { generateWeeks } from '@/lib/utils'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className='custom-tooltip'
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p className='label'>{`${label}`}</p>
        <p style={{ color: '#8280FF' }}>{`Absence: ${payload[0].value}`}</p>
        <p style={{ color: '#FF9066' }}>{`Presence: ${payload[1].value}`}</p>
      </div>
    )
  }

  return null
}

const WeeklyAttendanceChart = () => {
  const [selectedCourse, setSelectedCourse] = useState({})
  const [selectedWeek, setSelectedWeek] = useState({})
  const { data: WeeklyAttendanceData } = useGetTeacherWeeklyAttendance(
    1,
    selectedCourse.id,
    selectedWeek.id
  )
  const { data: courses } = useGetCourses(1, 'teacher')
  const [weekOptions, setWeekOptions] = useState([])

  useEffect(() => {
    setWeekOptions(generateWeeks())
  }, [])
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
              placeholder='Course'
              width='130px'
            />
            <ComboboxDemo
              onSelect={setSelectedWeek}
              options={weekOptions}
              width='130px'
              placeholder='Week nth'
            />
          </div>
        </div>
        <div className='piechart-1'>
          <ResponsiveContainer height={250} width='100%'>
            <LineChart
              data={WeeklyAttendanceData}
              margin={{ right: 25, left: 30, top: 40 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#f5f5f5' />
              <XAxis
                dataKey='weekDay'
                interval='preserveEnd'
                stroke='#666'
                tick={{ fill: '#666' }}
              />
              <YAxis
                interval='preserveEnd'
                stroke='#666'
                tick={{ fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign='top'
                height={36}
                formatter={(value) => (
                  <span style={{ color: '#666' }}>{value}</span>
                )}
              />
              <Line
                type='monotone'
                dataKey='absence'
                stroke='#8280FF'
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type='monotone'
                dataKey='presence'
                stroke='#FF9066'
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
export default WeeklyAttendanceChart

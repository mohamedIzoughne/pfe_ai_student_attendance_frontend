import React, { useContext } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { useGetCoursesAttendanceSummary } from '@/api/attendanceApi'

import { ComboboxDemo } from '../UI/ComboboxDemo'
// import { useGetCourses } from '@/api/curriculumApi'
import { useEffect, useState } from 'react'
import { generateWeeks } from '@/lib/utils'
import { Context } from '@/store'

export default function CourseAttendanceSummaryChart() {
  const { userConfiguration } = useContext(Context)
  const [selectedWeek, setSelectedWeek] = useState({})
  const isTeacher = userConfiguration.role === 'teacher'
  const { data: coursesAttendanceSummary } = useGetCoursesAttendanceSummary(
    selectedWeek?.id,
    isTeacher ? 1 : 0
  )

  const [weekOptions, setWeekOptions] = useState([])

  useEffect(() => {
    setWeekOptions(generateWeeks())
  }, [])

  const calculateChartWidth = () => {
    if (!coursesAttendanceSummary?.length) return '361px'
    const minWidth = 361
    const widthPerColumn = 120
    const calculatedWidth = Math.max(
      minWidth,
      coursesAttendanceSummary.length * widthPerColumn
    )
    return `${calculatedWidth}px`
  }

  return (
    <div className='partie-barchart'>
      <div className='title-barchart'>
        <h2>Attendance Summary</h2>
        <div>
          <ComboboxDemo
            onSelect={setSelectedWeek}
            options={weekOptions}
            placeholder='This week'
            width='130px'
          />
        </div>
      </div>
      <div
        style={{
          width: calculateChartWidth(),
          height: '400px',
          overflowX: 'auto',
        }}
      >
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={coursesAttendanceSummary}
            barSize={30}
            margin={{ top: 20, right: 100, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='courseName' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='presence'
              stackId='a'
              fill='#8280FF'
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey='absence'
              stackId='a'
              fill='#FF9066'
              radius={[30, 40, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

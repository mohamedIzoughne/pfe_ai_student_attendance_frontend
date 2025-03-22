import React from 'react'
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
import { useGetCourses } from '@/api/curriculumApi'

export default function CourseAttendanceSummaryChart() {
  const { data: coursesAttendanceSummary } = useGetCoursesAttendanceSummary()
  return (
    <div className='partie-barchart'>
      <div className='title-barchart'>
        <h2>Course Attendance Summary</h2>
        <div>
          <ComboboxDemo
            options={[]}
            placeholder='This week'
            width='130px'
          />
        </div>
      </div>
      <div style={{ width: '110%', height: '400px' }}>
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

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

import {
  useGetWeeklyAttendance,
  useGetCoursesAttendanceSummary,
} from '@/api/attendanceApi'



export default function App() {
  const { data: coursesAttendanceSummary } = useGetCoursesAttendanceSummary()

  return (
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
          {/* ✅ L'ordre des `Bar` est important : commencer par la couleur du bas */}
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
  )
}

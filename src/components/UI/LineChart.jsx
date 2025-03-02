import { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

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
import {useGetWeeklyAttendance} from '@/api/attendanceApi'

const WeeklyAttendanceChart = () => {
  const { data: WeeklyAttendanceData } = useGetWeeklyAttendance()
  const chart = (interval) => (
    <ResponsiveContainer height={250} width='100%'>
      <LineChart data={WeeklyAttendanceData} margin={{ right: 25, left: 30, top: 40 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='weekDay' interval={interval} />
        <YAxis interval={interval} />
        <Line
          type='monotone'
          dataKey='absence'
          stroke='#8280FF'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='presence' stroke='#FF9066' />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <>
      {chart('preserveEnd')}
      {/* {chart("preserveStart")}
      {chart("preserveStartEnd")}
      {chart("equidistantPreserveStart")}
      {chart(0)} */}
    </>
  )
}
export default WeeklyAttendanceChart
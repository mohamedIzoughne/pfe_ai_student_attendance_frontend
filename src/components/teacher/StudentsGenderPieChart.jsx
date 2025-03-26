import React, { useCallback, useState } from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'
import { ComboboxDemo } from '../UI/ComboboxDemo'

import { useGetGenderData, useGetTeacherGenderData } from '@/api/UsersApi'
import { useGetCourses } from '@/api/curriculumApi'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const StudentsPieChartComponent = ({
  width = 400,
  height = 310,
  innerRadius = 60,
  outerRadius = 80,
  colors = ['#FF9066', '#8280FF'],
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCourse, setSelectedCourse] = useState({})
  const { data: courses } = useGetCourses(1, 'teacher')
  const { data: genderData } = useGetTeacherGenderData(1, selectedCourse?.id)

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index)
  }, [])

  const data = [
    { name: 'Males', value: genderData?.maleStudents },
    { name: 'Females', value: genderData?.femaleStudents },
  ]

  return (
    <div className='div2 div2-ad'>
      <div className='mini-div-2'>
        <h4 className='h4-2'>Total Students by Gender</h4>
        <div>
          <ComboboxDemo
            placeholder='Class'
            className='comboButton'
            width='130px'
            options={courses}
            onSelect={setSelectedCourse}
          />
        </div>
      </div>
      <div className='piechart-1 piechart-1-ad'>
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey='value'
            onMouseEnter={onPieEnter}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index] || '#ccc'} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}

export default StudentsPieChartComponent

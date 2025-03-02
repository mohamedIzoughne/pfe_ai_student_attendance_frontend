import { IoAddOutline } from 'react-icons/io5'

const scheduleData = [
  {
    day: 'Monday',
    time: '08:30 - 10:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Lecture',
    subjectName: 'Java',
    color: '#FDFCE8', // Light yellow
  },
  {
    day: 'Tuesday',
    time: '10:30 - 12:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Lab',
    subjectName: 'Java',
    color: '#E8FDFA', // Light cyan
  },
  {
    day: 'Thursday',
    time: '10:30 - 12:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Workshop',
    subjectName: 'Java',
    color: '#FDE8FD', // Light pink
  },
  {
    day: 'Friday',
    time: '16:30 - 18:15',
    courseName: 'Classe GI 1 G3',
    sessionName: 'Java Project',
    subjectName: 'Java',
    color: '#E8E8FD', // Light blue
  },
]

const TeacherSchedule = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const hours = [
    '08:30 - 10:15',
    '10:30 - 12:15',
    '14:30 - 16:15',
    '16:30 - 18:15',
  ]

  return (
    <div className='div-Table'>
      <div className='just-title'>
        <h3>Schedule</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day} className='high-title'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className='special'>{hour}</td>
              {days.map((day, dayIndex) => {
                const session = scheduleData.find(
                  (s) => s.day === day && s.time === hour
                )
                return (
                  <td key={dayIndex}>
                    {session ? (
                      <div
                        className='th-div p-2 rounded'
                        style={{ backgroundColor: session.color }}
                      >
                        <p>
                          {session.courseName} - {session.subjectName}
                        </p>
                        <h2>{session.sessionName}</h2>
                      </div>
                    ) : (
                      <button>
                        <IoAddOutline className='stroke-[#538cac] Add-Button' />
                      </button>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeacherSchedule

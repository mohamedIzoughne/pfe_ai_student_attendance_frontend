import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AttendanceMarking from './pages/AttendanceMarking'
import Complaints from './pages/Complaints'
import Exams from './pages/Exams'
import Students from './pages/Students'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='mark-attendance' element={<AttendanceMarking />} />
          <Route path='students' element={<Students />} />
          <Route path='complaints' element={<Complaints />} />
          <Route path='exams' element={<Exams />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

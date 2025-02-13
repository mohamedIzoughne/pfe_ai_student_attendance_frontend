import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AttendanceMarking from './pages/AttendanceMarking'
import Complaints from './pages/Complaints'
import Exams from './pages/Exams'
import Students from './pages/Students'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import OnBoarding from './pages/OnBoarding'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/on-boarding' element={<OnBoarding />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='mark-attendance' element={<AttendanceMarking />} />
          <Route path='students' element={<Students />} />
          <Route path='complaints' element={<Complaints />} />
          <Route path='exams' element={<Exams />} />
        </Route>
        <Route path='/' element={<OnBoarding />} />
      </Routes>
    </Router>
  )
}

export default App

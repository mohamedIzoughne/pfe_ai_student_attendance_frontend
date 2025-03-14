// src/routes.js
import Home from './pages/teacher/Home'
import AttendanceMarking from './pages/teacher/AttendanceMarking'
import Students from './pages/Students'
import Complaints from './pages/teacher/Complaints'
import Exams from './pages/teacher/Exams'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OnBoarding from './pages/OnBoarding'
import Layout from './components/Layout'
import Teachers from './pages/admin/Teachers'
import Courses from './pages/admin/Courses'
import { default as AdminHome } from './pages/admin/Home'
import ExamMarks from './pages/teacher/ExamMarks'

const routes = [
  { path: '/', element: <Home />, roles: ['teacher', 'student'] },
  {
    path: 'mark-attendance',
    element: <AttendanceMarking />,
    roles: ['teacher'],
  },
  {
    path: 'students/:studentId?',
    element: <Students />,
    roles: ['admin', 'teacher'],
  },
  {
    path: 'complaints',
    element: <Complaints />,
    roles: ['admin', 'teacher', 'student'],
  },
  { path: 'exams', element: <Exams />, roles: ['admin', 'teacher'] },
  { path: 'admin', element: <AdminHome />, roles: ['admin'] },
  { path: 'teachers', element: <Teachers />, roles: ['admin'] },
  { path: 'courses', element: <Courses />, roles: ['admin'] },
  {
    path: 'exams/exam-marks/:examId',
    element: <ExamMarks />,
    roles: ['teacher'],
  },
]

const authRoutes = [
  { path: '/login', element: <Login />, roles: ['guest'] },
  { path: '/sign-up', element: <Signup />, roles: ['guest'] },
  { path: '/on-boarding', element: <OnBoarding />, roles: ['guest'] },
]

export { routes, authRoutes }

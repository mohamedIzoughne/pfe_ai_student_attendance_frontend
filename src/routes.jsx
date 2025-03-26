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
import { default as StudentHome } from './pages/student/Home'

import ExamMarks from './pages/teacher/ExamMarks'
import ImageCutter from './pages/student/ImageCutter'
import ImageCropper from './pages/ImageCropper'
// import RegisterUser from './pages/RegisterUser'

const routes = [
  { path: '/', element: <Home />, roles: ['teacher'] },
  { path: '/', element: <StudentHome />, roles: ['student'] },
  // { path: '/register', element: <RegisterUser />, roles: ['student', 'admin', 'teacher'] },
  { path: '/', element: <AdminHome />, roles: ['admin'] },
  { path: '/image-crop', element: <ImageCutter />, roles: ['student'] },
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
  { path: 'teachers/:teacherId?', element: <Teachers />, roles: ['admin'] },
  { path: 'classes', element: <Courses />, roles: ['admin'] },
  {
    path: 'exams/exam-marks/:examId',
    element: <ExamMarks />,
    roles: ['teacher'],
  },
]

const authRoutes = [
  { path: '/login', element: <Login />, roles: ['admin', 'teacher'] },
  { path: '/sign-up', element: <Signup />, roles: ['admin', 'teacher'] },
  {
    path: '/on-boarding',
    element: <OnBoarding />,
    roles: ['admin', 'teacher'],
  },
  {
    path: '/image-cut',
    element: <ImageCropper />,
    roles: ['admin', 'teacher', 'student'],
  },
]

export { routes, authRoutes }

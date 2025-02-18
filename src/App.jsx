import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { routes, authRoutes } from './routes'
import Layout from './components/Layout'
import { Context } from './store'

function App() {
  const { userConfiguration } = useContext(Context)
  const userRole = userConfiguration?.role

  return (
    <Router>
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Protected routes based on role */}
        <Route path='/' element={<Layout />}>
          {routes
            .filter((route) => route.roles.includes(userRole))
            .map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App

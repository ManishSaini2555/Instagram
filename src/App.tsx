import React, { useEffect } from 'react'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserAuth } from './context/AuthContext'
import UserRoutes from './routes/UserRoutes'
import LoggedOutRoutes from './routes/LoggedOutRoutes'
import { useLocation } from 'react-router-dom'

function App() {
  const { isLoggedIn } = UserAuth()
  const locationUrl = useLocation()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [locationUrl])
  return (
    <div className="App">
      <ToastContainer />
      {isLoggedIn ? <UserRoutes /> : <LoggedOutRoutes />}
    </div>
  )
}

export default App

import Loader from '@src/common/components/loader/Loader'
import Footer from '@src/components/footer/Footer'
import Header from '@src/components/header/Header'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LoggedOutRoutes: React.FC<{}> = ({}) => {
  const CreateUser = lazy(
    async () => await import('@pages/create-user/CreateUser')
  )
  const LogIn = lazy(async () => await import('@pages/Login/Login'))
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/create-user" element={<CreateUser />}></Route>
          <Route path="/*" element={<LogIn />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default LoggedOutRoutes

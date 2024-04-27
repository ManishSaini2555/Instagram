import Loader from '@src/common/components/loader/Loader'
import { LoggedOutRoutesEnum } from '@src/common/constants/constants'
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
      {/* <Header /> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={LoggedOutRoutesEnum.HOME} element={<LogIn />}></Route>
          <Route
            path={LoggedOutRoutesEnum.CREATE_USER}
            element={<CreateUser />}
          ></Route>
          <Route path={LoggedOutRoutesEnum.DEFAULT} element={<LogIn />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default LoggedOutRoutes

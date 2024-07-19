import Loader from '@src/common/components/loader/Loader'
import { LoggedInRoutesEnum } from '@src/common/constants/constants'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const UserRoutes: React.FC<{}> = ({}) => {
  const Home = lazy(async () => await import('@pages/home/Home'))
  const Profile = lazy(async () => await import('@pages/profie/Profile'))
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={LoggedInRoutesEnum.HOME} element={<Home />}></Route>
          <Route path={LoggedInRoutesEnum.DEFAULT} element={<Home />}></Route>
          <Route
            path={LoggedInRoutesEnum.PROFILE}
            element={<Profile />}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserRoutes

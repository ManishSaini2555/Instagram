import Loader from '@src/common/components/loader/Loader'
import { LoggedInRoutesEnum } from '@src/common/constants/constants'
import Footer from '@src/components/footer/Footer'
import Header from '@src/components/header/Header'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const UserRoutes: React.FC<{}> = ({}) => {
  const Home = lazy(async () => await import('@pages/home/Home'))

  return (
    <div>
      {/* <Header /> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={LoggedInRoutesEnum.HOME} element={<Home />}></Route>
          <Route path={LoggedInRoutesEnum.DEFAULT} element={<Home />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default UserRoutes

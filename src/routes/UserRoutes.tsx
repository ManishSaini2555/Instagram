import Loader from '@src/common/components/loader/Loader'
import Footer from '@src/components/footer/Footer'
import Header from '@src/components/header/Header'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const UserRoutes: React.FC<{}> = ({}) => {
  const Home = lazy(async () => await import('@pages/home/Home'))

  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default UserRoutes

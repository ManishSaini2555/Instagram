import React, { lazy, Suspense, useEffect } from 'react'

import './Home.scss'
import Header from '@components/header/Header'
import { Routes, Route, useLocation } from 'react-router-dom'
import Loader from '@src/common/components/loader/Loader'
import { userInfo } from '@src/common/utils/user'
import { environmentUrl } from '@src/common/utils/environment'
import { getKeyFromCookies } from '@src/common/utils/cookie'
// import Dashboard from "@pages/dashboard/Dashboard";
// import ManageTrip from "@src/pages/Manage/manage-trips/ManageTrip";
// import Default from "../default/Default";
// import LogIn from "../Login/Login";

const Default = lazy(async () => await import('../default/Default'))
const Dashboard = lazy(async () => await import('@pages/dashboard/Dashboard'))
const LogIn = lazy(async () => await import('../Login/Login'))
const ManageTrip = lazy(
  async () => await import('@src/pages/Manage/manage-trips/ManageTrip')
)

const Home = () => {
  // function openDialog() {
  //   console.log("the dialog is open");
  //   setIsOpen(!isOpen);
  //   console.log("dialog is shown");
  // }
  // useEffect(() => {
  //   navigate({
  //     pathname: "/summary",
  //   });
  // }, []);

  const locationUrl = useLocation()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [locationUrl])

  useEffect(() => {
    const keyValuePairs = getKeyFromCookies(document)
    const user = userInfo()
    // console.log(window.location.href)
    if (!user.isLoggedIn && location.host !== 'localhost:8080') {
      if (!window.location.href.includes('manage-trip')) {
        if (keyValuePairs?.Authenticated) {
          const returnURL = window.location.href
          // window.location.href = returnURL
          window.location.href = `${environmentUrl()}/my-account/deeplink/signin?ReturnUrl=${returnURL}`
        }
      }
    }
  }, [])

  return (
    <div className="home">
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Default />}></Route>
            {/* <Route path="manage" element={<Default />}></Route> */}
            <Route path="summary" element={<Dashboard />}></Route>
            <Route path="login" element={<LogIn />}></Route>
            <Route path="manage-trip" element={<ManageTrip />}></Route>
          </Routes>
        </div>
      </Suspense>
      {/* <Footer /> */}
    </div>
  )
}

export default Home

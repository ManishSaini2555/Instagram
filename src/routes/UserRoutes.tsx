import Loader from '@src/common/components/loader/Loader'
import { LoggedInRoutesEnum } from '@src/common/constants/constants'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const UserRoutes: React.FC<{}> = ({}) => {
  const Home = lazy(async () => await import('@pages/home/Home'))
  const Profile = lazy(async () => await import('@pages/profie/Profile'))
  const Search = lazy(async () => await import('@src/pages/search/Search'))
  const Chat = lazy(async () => await import('@src/pages/chat/Chat'))
  const Friends = lazy(async () => await import('@src/pages/friends/Friends'))
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
          <Route path={LoggedInRoutesEnum.SEARCH} element={<Search />}></Route>
          <Route path={LoggedInRoutesEnum.CHAT} element={<Chat />}></Route>
          <Route
            path={LoggedInRoutesEnum.FRIENDS}
            element={<Friends />}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserRoutes

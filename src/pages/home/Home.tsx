import React from 'react'
import './Home.scss'
import { UserAuth } from '@src/context/AuthContext'
import { logOut } from '@src/functions/Auth'

const Home: React.FC<{}> = () => {
  const { user } = UserAuth()
  return (
    <div className="home">
      Welcome {user?.firstName ? user?.firstName : user?.email}
      <div className="logout">
        <button onClick={() => logOut()}>Log out</button>
      </div>
    </div>
  )
}

export default Home

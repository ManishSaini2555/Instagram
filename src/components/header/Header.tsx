import { UserAuth } from '@src/context/AuthContext'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const { isLoggedIn } = UserAuth()
  return (
    <div>
      {isLoggedIn ? (
        <nav>
          <Link to="/">Home</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create-user">Create User</Link>
        </nav>
      )}
    </div>
  )
}

export default Header

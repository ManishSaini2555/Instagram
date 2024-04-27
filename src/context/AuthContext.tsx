import React, { createContext, useContext, useState } from 'react'

interface UserContextType {
  user: any
  isLoggedIn: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserAuth = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider')
  }
  return context
}

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserAuthProvider

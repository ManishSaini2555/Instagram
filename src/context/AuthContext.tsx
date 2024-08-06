import { TableNameEnum } from '@src/common/constants/constants'
import { auth, db } from '@src/firebase/fire'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
  user: any
  isLoggedIn: boolean
  loading: boolean
  setLoading: (loading: boolean) => void
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
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log('User data: ', user)
  }, [user])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        setIsLoggedIn(true)
        onSnapshot(doc(db, TableNameEnum.USERS, currentUser.uid), (doc) => {
          setUser(doc.data())
        })
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserAuthProvider

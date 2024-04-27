import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { db, auth } from '@src/firebase/fire'
import { doc, setDoc } from 'firebase/firestore'

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  } catch (error) {
    return error
  }
}

export const logOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    return error
  }
}

export const signUp = async (
  email: string,
  password: string,
  userData: any
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', user.user.uid), {
      uid: user.user.uid,
      ...userData
    })
    return user.user
  } catch (error) {
    return error
  }
}

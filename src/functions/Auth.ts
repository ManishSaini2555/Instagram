import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { db, auth } from '@src/firebase/fire'
import { doc, setDoc } from 'firebase/firestore'
import { readData } from './helper'
import { createRelationships } from './Relationships'
import { TableNameEnum } from '@src/common/constants/constants'

const provider = new GoogleAuthProvider()

const actionCodeSettings = {
  url: window.location.origin,
  handleCodeInApp: true
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  } catch (error) {
    throw error
  }
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    console.log('Google user details: ', user)
    // IdP data available using getAdditionalUserInfo(result)
    const details = getAdditionalUserInfo(result)
    console.log('Google user extra details: ', details)
    const userData = {
      firstName: details?.profile?.given_name,
      lastName: details?.profile?.family_name,
      email: details?.profile?.email,
      phoneNumber: user?.phoneNumber
    }
    if (!(await readData(TableNameEnum.USERS, user.uid)))
      await createRelationships(user.uid)
    await setDoc(doc(db, TableNameEnum.USERS, user.uid), {
      uid: user.uid,
      ...userData
    })
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.customData.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
  }
}

export const logOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    throw error
  }
}

export const signUp = async (
  email: string,
  password: string,
  userData: any
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, TableNameEnum.USERS, user.user.uid), {
      uid: user.user.uid,
      ...userData
    })
    await createRelationships(user.user.uid)
    return user.user
  } catch (error) {
    throw error
  }
}

export const sendLoginLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw error
  }
}

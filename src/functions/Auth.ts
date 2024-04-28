import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { db, auth } from '@src/firebase/fire'
import { doc, setDoc } from 'firebase/firestore'

const provider = new GoogleAuthProvider()

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  } catch (error) {
    throw error
  }
}

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user
      console.log('Google user details: ', user)
      // IdP data available using getAdditionalUserInfo(result)
      const details = getAdditionalUserInfo(result)
      console.log('Google user extra details: ', details)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
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
    await setDoc(doc(db, 'users', user.user.uid), {
      uid: user.user.uid,
      ...userData
    })
    return user.user
  } catch (error) {
    throw error
  }
}

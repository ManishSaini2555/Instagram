import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseconfig = {
  apiKey: 'AIzaSyCO-Z-G90Ozoa6u0peYxRgf_A0j4WXT9YI',
  authDomain: 'instagram-56dab.firebaseapp.com',
  projectId: 'instagram-56dab',
  storageBucket: 'instagram-56dab.appspot.com',
  messagingSenderId: '442625432165',
  appId: '1:442625432165:web:1b128dff67394bbd02048c'
}

initializeApp(firebaseconfig)
export const db = getFirestore()
export const auth = getAuth()

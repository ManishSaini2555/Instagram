import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase/fire'
import { v4 } from 'uuid'

export const createData = async (collectionName: any, data: any) => {
  const id = v4()
  try {
    const docRef = doc(db, collectionName, id)
    await setDoc(docRef, { ...data, id })
  } catch (error: any) {
    console.error(error?.message ? error.message : error)
    throw new Error(error)
  }
}

export const readData = async (collectionName: any, id: any) => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else console.log('No such document exists !!')
  } catch (error: any) {
    console.error(
      'Error reading document : ',
      error?.message ? error.message : error
    )
  }
}

export const updateData = async (collectionName: any, data: any, id: any) => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, { ...data, id })
    console.log('Document successfully updated!!')
  } catch (error: any) {
    console.error(
      'Error updating document : ',
      error?.message ? error.message : error
    )
    throw new Error(error)
  }
}

export const deleteData = async (collectionName: any, id: any) => {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
    console.log('Document successfully deleted!!')
  } catch (error: any) {
    console.error(
      'Error deleting document : ',
      error?.message ? error.message : error
    )
  }
}

export const readAllData = async (collectionName: string) => {
  try {
    const newDataArray: any = []
    const querySnapshot = await getDocs(collection(db, collectionName))
    querySnapshot.forEach((doc) => {
      newDataArray.push(doc.data())
    })
    return newDataArray
  } catch (error: any) {
    console.error('Error reading: ', error?.message ? error.message : error)
  }
}

export const listenToCollection = (collectionName: string, callback: any) => {
  const collectionRef = collection(db, collectionName)
  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArray: any[] = []
    querySnapshot.forEach((doc) => {
      newDataArray.push(doc.data())
    })
    callback(newDataArray)
  })
}

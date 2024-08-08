import {
  WhereFilterOp,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase/fire'
import { v4 } from 'uuid'
import { conversationType } from '@src/common/types'

export const createData = async (
  collectionName: any,
  data: any,
  setId?: string
) => {
  const id = v4()
  try {
    const docRef = doc(db, collectionName, setId ? setId : id)
    await setDoc(docRef, { ...data, id: setId ? setId : id })
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
      const data: any = docSnap.data()
      return data
    } else console.log('No such document exists !!')
  } catch (error: any) {
    console.error(
      'Error reading document : ',
      error?.message ? error.message : error
    )
  }
}

export const readDataWithSimpleQuery = async (
  collectionName: any,
  column: string,
  condition: WhereFilterOp,
  value: any
) => {
  try {
    const docRef = collection(db, collectionName)
    const q = query(docRef, where(column, condition, value))
    const querySnapshot = await getDocs(q)
    const data: any[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data()
        } as any)
    )
    return data
  } catch (error: any) {
    console.error(
      'Error reading document : ',
      error?.message ? error.message : error
    )
  }
}

export const readDataWithOrQuery = async (
  collectionName: any,
  column1: string,
  condition1: WhereFilterOp,
  value1: any,
  column2: string,
  condition2: WhereFilterOp,
  value2: any
) => {
  try {
    const docRef = collection(db, collectionName)
    const q = query(
      docRef,
      or(where(column1, condition1, value1), where(column2, condition2, value2))
    )
    const querySnapshot = await getDocs(q)

    const data: conversationType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data()
        } as conversationType)
    )
    return data
  } catch (error: any) {
    console.error(
      'Error reading document : ',
      error?.message ? error.message : error
    )
  }
}

export const readDataWithAndQuery = async (
  collectionName: any,
  column1: string,
  condition1: WhereFilterOp,
  value1: any,
  column2: string,
  condition2: WhereFilterOp,
  value2: any
) => {
  try {
    const docRef = collection(db, collectionName)
    const q = query(
      docRef,
      and(
        where(column1, condition1, value1),
        where(column2, condition2, value2)
      )
    )
    const querySnapshot = await getDocs(q)

    const data: conversationType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data()
        } as conversationType)
    )
    return data
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

export const detectChanges = (collectionName: string, callback: any) => {
  const collectionRef = collection(db, collectionName)
  return onSnapshot(collectionRef, (querySnapshot) => {
    callback()
  })
}

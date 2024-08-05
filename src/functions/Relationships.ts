import { toast } from 'react-toastify'
import { storage } from '@src/firebase/fire'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { createData, readAllData, readData, updateData } from './helper'
import { relationshipsType, userType } from '@src/common/types'

export const getRelationships = async (id: any) => {
  try {
    const data = await readData('relationships', id)
    if (data) {
      return data
    } else {
      toast.error('No such document exists !!')
      return createRelationships(id)
    }
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const createRelationships = async (id: any) => {
  try {
    const defaultData: relationshipsType = {
      uid: `${id}`,
      friends: [],
      requestRecieved: [],
      requestSent: []
    }
    await createData('relationships', defaultData, id)
    console.log('Relationship created successfully.')
    return await readData('relationships', id)
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const sendFriendRequest = async (sender: string, reciever: string) => {
  try {
    const senderData = await getRelationships(sender)
    const recieverData = await getRelationships(reciever)
    senderData?.requestSent?.push(reciever)
    recieverData?.requestRecieved?.push(sender)
    await updateData('relationships', { ...senderData }, sender)
    await updateData('relationships', { ...recieverData }, reciever)
    toast.success('Friend request sent')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const acceptFriendRequest = async (
  updateMessage: string,
  image: File,
  user: any
) => {
  try {
    const imageRef = ref(storage, `profile/${v4()}`)
    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    await updateData('users', { ...user, profilePic: url }, user.uid)
    toast.success(updateMessage)
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const searchUsers = async (userSearch: string) => {
  try {
    const users = await readAllData('users')
    return users.filter((user: userType) => {
      return userSearch
        .split(' ')
        .some(
          (search) =>
            user?.firstName
              ?.toLocaleLowerCase()
              ?.includes(search?.toLocaleLowerCase()) ||
            user?.lastName
              ?.toLocaleLowerCase()
              ?.includes(search?.toLocaleLowerCase())
        )
    })
  } catch (err: any) {
    toast.error(err?.message)
  }
}

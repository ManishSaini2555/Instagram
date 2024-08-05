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
      id,
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
export const acceptFriendRequest = async (sender: string, reciever: string) => {
  try {
    const senderData: relationshipsType = await getRelationships(sender)
    const recieverData: relationshipsType = await getRelationships(reciever)
    senderData!.requestSent = senderData!.requestSent!.filter(
      (id: string) => id != reciever
    )
    recieverData!.requestRecieved = recieverData!.requestRecieved!.filter(
      (id: string) => id != sender
    )
    senderData?.friends?.push(reciever)
    recieverData?.friends?.push(sender)
    await updateData('relationships', { ...senderData }, sender)
    await updateData('relationships', { ...recieverData }, reciever)
    toast.success('Friend request sent')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const rejectFriendRequest = async (sender: string, reciever: string) => {
  try {
    const senderData: relationshipsType = await getRelationships(sender)
    const recieverData: relationshipsType = await getRelationships(reciever)
    senderData!.requestSent = senderData!.requestSent!.filter(
      (id: string) => id != reciever
    )
    recieverData!.requestRecieved = recieverData!.requestRecieved!.filter(
      (id: string) => id != sender
    )
    await updateData('relationships', { ...senderData }, sender)
    await updateData('relationships', { ...recieverData }, reciever)
    toast.success('Friend request sent')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const unFriend = async (friend1Id: string, friend2Id: string) => {
  try {
    const friend1: relationshipsType = await getRelationships(friend1Id)
    const friend2: relationshipsType = await getRelationships(friend2Id)
    friend1!.friends = friend1!.friends!.filter((id: string) => id != friend2Id)
    friend2!.friends = friend2!.friends!.filter((id: string) => id != friend1Id)
    await updateData('relationships', { ...friend1 }, friend1Id)
    await updateData('relationships', { ...friend2 }, friend2Id)
    toast.success('Friend request sent')
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

export const getUserByUid = async (id: string) => {
  try {
    const user: userType = await readData('users', id)
    return user
  } catch (e: any) {
    toast.error(e?.message)
  }
}

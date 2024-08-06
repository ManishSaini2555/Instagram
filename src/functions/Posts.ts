import {
  newCommentType,
  newPostType,
  postType,
  postTypeWithNewComment,
  userType
} from '@src/common/types'
import { createData, readAllData, updateData } from './helper'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@src/firebase/fire'
import { v4 } from 'uuid'
import { TableNameEnum } from '@src/common/constants/constants'

export const getAllPosts = async () => {
  const tempArray: newPostType[] = []
  const posts = await readAllData(TableNameEnum.POSTS)
  const users = await readAllData(TableNameEnum.USERS)
  posts.forEach((post: postTypeWithNewComment) => {
    const user: userType = users.find((user: userType) => user.uid === post.uid)
    post.comment.forEach((comment: newCommentType) => {
      const user = users?.find((user: userType) => user?.uid === comment?.uid)
      comment.user = user?.firstName[0] + user.lastName[0]
      comment.profile = user?.profilePic
    })
    tempArray.push({ ...user, ...post })
  })
  return tempArray
}

export const getUserPosts = async (uid: string) => {
  const posts = await readAllData(TableNameEnum.POSTS)
  const tempArray = posts.filter((post: postType) => post.uid == uid)
  return tempArray
}
export const getUserSavedPosts = async (uid: string) => {
  const posts = await readAllData(TableNameEnum.POSTS)
  const tempArray = posts.filter((post: postType) =>
    post.save?.some((item) => item === uid)
  )
  return tempArray
}

export const createNewPost = async (post: postType, image: File) => {
  try {
    let postUrl = ''
    const imageRef = ref(storage, `${TableNameEnum.POSTS}/${v4()}`)
    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    postUrl = url
    post.post = postUrl
    await createData(TableNameEnum.POSTS, post)
    toast.success('Post created successfully')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const updatePost = async (post: postType, updateMessage: string) => {
  try {
    await updateData(TableNameEnum.POSTS, post, post.id)
    toast.success(updateMessage)
  } catch (err: any) {
    toast.error(err?.message)
  }
}

import { newPostType, postType, userType } from '@src/common/types'
import { createData, readAllData, updateData } from './helper'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@src/firebase/fire'
import { v4 } from 'uuid'

export const getAllPosts = async () => {
  const tempArray: newPostType[] = []
  const posts = await readAllData('posts')
  const users = await readAllData('users')
  posts.forEach((post: postType) => {
    const user: userType = users.find((user: userType) => user.uid === post.uid)
    tempArray.push({ ...post, ...user })
  })
  return tempArray
}

export const createNewPost = async (post: postType, image: File) => {
  try {
    let postUrl = ''
    const imageRef = ref(storage, `posts/${v4()}`)
    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    postUrl = url
    post.post = postUrl
    await createData('posts', post)
    toast.success('Post created successfully')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const updatePost = async (post: postType, updateMessage: string) => {
  try {
    await updateData('posts', post, post.id)
    toast.success(updateMessage)
  } catch (err: any) {
    toast.error(err?.message)
  }
}

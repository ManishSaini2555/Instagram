import { newPostType, postType, userType } from '@src/common/types'
import { createData, readAllData } from './helper'
import { toast } from 'react-toastify'

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

export const createNewPost = async (post: postType) => {
  try {
    await createData('posts', post)
    toast.success('Post created successfully')
  } catch (err: any) {
    toast.error(err?.message)
  }
}

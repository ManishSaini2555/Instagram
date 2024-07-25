import React from 'react'
import './AddPost.scss'
import { createNewPost } from '@src/functions/Posts'
import { postType } from '@src/common/types'
import { toast } from 'react-toastify'
import { UserAuth } from '@src/context/AuthContext'
import AddImage from '../add-image/AddImage'

const AddPost: React.FC<{
  closeAddPost: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ closeAddPost }) => {
  const { user, setLoading } = UserAuth()

  const sharePost = async (img: File) => {
    try {
      setLoading(true)
      const postData: postType = {
        id: '',
        uid: user?.uid,
        post: '',
        like: [],
        save: [],
        comment: [],
        timeStamp: new Date().toISOString()
      }
      if (img) {
        await createNewPost(postData, img)
        closeAddPost(false)
      } else toast.error('Something went wrong, try again later')
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <AddImage
      closeAddImage={closeAddPost}
      onSubmit={sharePost}
      submitButtonText="Share"
      popUpHeading="Create new post"
    />
  )
}

export default AddPost
